import { Router } from 'express';
import {listGames} from "../controllers/gamesController.js"

const gamesRouter = Router();

gamesRouter.get('/games', listGames);

export default gamesRouter;
