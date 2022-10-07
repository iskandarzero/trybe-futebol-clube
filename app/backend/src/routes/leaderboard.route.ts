import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoute.get('/home', leaderboardController.pt);

export default leaderboardRoute;
