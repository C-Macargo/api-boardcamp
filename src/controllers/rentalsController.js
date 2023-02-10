import dayjs from "dayjs";
import { db } from "../configs/database.connection.js";

export async function listRentals(_, res) {
	try {
		const rentals = await db.query("SELECT * FROM rentals");
		res.send(rentals.rows);
	} catch (error) {
		return res.status(500).send(err.message);
	}
}

export async function createRental(req, res) {
	const { customerId, gameId, daysRented } = req.body;
	const rentalDate = dayjs(Date.now()).format("YYYY-MM-DD");

	try {
		const customerInformation = await db.query(
			"SELECT * FROM customers WHERE id = $1",
			[customerId]
		);
		const gameInformation = await db.query(
			"SELECT * FROM games WHERE id = $1",
			[gameId]
		);
		if (
			customerInformation.rowCount === 0 ||
			gameInformation.rowCount === 0
		) {
			return res.status(400).send("user or game do not exist");
		}
		const { pricePerDay } = gameInformation.rows[0];
		const originalPrice = pricePerDay * daysRented;

		await db.query(
			`INSERT INTO rentals 
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate","originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
			[
				customerId,
				gameId,
				rentalDate,
				daysRented,
				null,
				originalPrice,
				null,
			]
		);
		return res.status(201).send("rental created successfully");
	} catch (err) {
		return res.status(500).send(err.message);
	}
}
