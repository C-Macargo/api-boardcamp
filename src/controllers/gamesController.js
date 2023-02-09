import { db } from "../configs/database.connection.js";

export async function listGames(_, res) {
	try {
		const games = await db.query("SELECT * FROM games");
		res.send(games.rows);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function createGame(req, res) {
	const { name, image, stockTotal, pricePerDay } = req.body;
	try {
		const game = await db.query(
			`INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1, $2, $3, $4) RETURNING *`,
			[name, image, stockTotal, pricePerDay]
		);
		console.log(game.rows[0]);
		res.status(201).send("game added successfully");
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
}
