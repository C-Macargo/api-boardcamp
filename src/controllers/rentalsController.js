import { db } from "../configs/database.connection.js";

export async function listRentals(_, res) {
	try {
		const rentals = await db.query("SELECT * FROM rentals");
		res.send(rentals.rows);
	} catch (error) {
		res.sendStatus(500);
	}
}

