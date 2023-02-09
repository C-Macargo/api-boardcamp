import { Router } from 'express';
import { listGames } from '../controller/gamesController.js';

const gamesRouter = Router();

gamesRouter.get('/games', listGames);

export default gamesRouter;
