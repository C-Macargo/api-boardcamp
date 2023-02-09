import { db } from "../config/database.connection.js";

export async function listGames(_, res) {
    try {
      const games = await db.query('SELECT * FROM games');
      res.send(games);
    } catch (error) {
      res.sendStatus(500);
    }
  }

