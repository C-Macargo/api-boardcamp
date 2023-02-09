import { Router } from 'express';
import {listGames, createGame} from "../controllers/gamesController.js"
import { createGameSchema } from '../schema/createGameSchema.js';
import { validateSchema } from '../middlewares/validateSchema.js';

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games',validateSchema(createGameSchema),  createGame);


export default gamesRouter;
