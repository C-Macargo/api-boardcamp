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

		const checkAvailability = await db.query(
			'SELECT * FROM rentals WHERE "gameId" = $1',
			[gameId]
		);
		const checkStock = await db.query(
			'SELECT "stockTotal" FROM games WHERE id = $1',
			[gameId]
		);

		if (checkStock.rows[0].stockTotal <= checkAvailability.rowCount) {
			return res.status(400).send("out of stock");
		}

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

export async function returnRental(req, res) {
	const { id } = req.params;
	const returnDay = dayjs(Date.now()).format("YYYY-MM-DD");
	const returnDate = new Date();

	try {
		const rental = await db.query('SELECT * FROM rentals WHERE "id" = $1', [
			id,
		]);

		if (rental.rowCount === 0) {
			return res.status(404).send("rental does not exist");
		}

		if (rental.rows[0].returnDate !== null) {
			return res.status(400).send("rental is already finalized");
		}
		const { rentDate, daysRented, originalPrice, customerId, gameId } =
			rental.rows[0];

		const refactoredRentDate = new Date(rentDate)

		let delayedTime = returnDate.getTime() - refactoredRentDate.getTime();

		const delayedDays = Math.floor(delayedTime / (1000 * 3600 * 24));

		const delayFee = (delayedDays - daysRented) * (originalPrice / daysRented)

		if (delayFee < 0) {
			await db.query(
				`UPDATE rentals SET "returnDate"=$1 WHERE id=$2 RETURNING *`,
				[returnDay, id]
			);
			return res.status(200).send("ok");
		} else {
			await db.query(
				`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3 RETURNING *`,
				[returnDay, delayFee, id]
			);
			return res.status(200).send("ok");
		}
	} catch (err) {
		return res.status(500).send(err.message);
	}
}

export async function deleteRental(req, res) {
	const { id } = req.params;

	try {
		const rental = await db.query('SELECT * FROM rentals WHERE "id"=$1', [
			id,
		]);

		if (rental.rowCount === 0) {
			return res.status(404).send("rental does not exist");
		}

		if (rental.rows[0].returnDate === null) {
			return res.status(400).send("rental not finished");
		}

		await db.query('DELETE FROM rentals WHERE "id"=$1', [id]);
		return res.status(200).send("rental deleted");
	} catch (err) {
		return res.status(500).send(err.message);
	}
}
