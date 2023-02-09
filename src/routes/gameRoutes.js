import { Router } from "express";
import { listGames, createGame } from "../controllers/gamesController.js";
import { gameSchema } from "../schema/gameSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games", validateSchema(gameSchema), createGame);

export default gamesRouter;