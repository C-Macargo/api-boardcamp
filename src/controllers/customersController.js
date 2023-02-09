import { db } from "../configs/database.connection.js";

export async function listCustomers(_, res) {
	try {
		const customers = await db.query("SELECT * FROM customers");
		res.send(customers.rows);
	} catch (error) {
		res.sendStatus(500);
	}
}
