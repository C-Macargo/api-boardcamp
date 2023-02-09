import { db } from "../configs/database.connection.js";

export async function listCustomers(_, res) {
	try {
		const customers = await db.query("SELECT * FROM customers");
		res.send(customers.rows);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function createCustomer(req, res) {
	const { name, phone, cpf, birthday } = req.body;
	try {
		const existingCustomer = await db.query(
			`SELECT * FROM customers WHERE "cpf" = $1`,
			[cpf]
		);
		if (existingCustomer.rows.length > 0) {
			return res.status(409).send("Customer already exists");
		}
		const customer = await db.query(
			`INSERT INTO customers (name,"phone","cpf","birthday") VALUES ($1, $2, $3, $4) RETURNING *`,
			[name, phone, cpf, birthday]
		);
		console.log(customer.rows[0]);
		res.status(201).send("customer added successfully");
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
}