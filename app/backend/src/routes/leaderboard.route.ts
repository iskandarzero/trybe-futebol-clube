import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoute.get('/home', leaderboardController.homeLeaderboard);
leaderboardRoute.get('/away', leaderboardController.awayLeaderboard);
leaderboardRoute.get('/', leaderboardController.leaderboard);

export default leaderboardRoute;
