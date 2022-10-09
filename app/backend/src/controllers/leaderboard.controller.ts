import LeaderboardService from '../services/leaderboard.service';
import { Request, Response } from 'express';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) {}

  public homeLeaderboard = async (_req: Request, res: Response) => {
    const results = await this._leaderboardService.leaderboard('home');

    res.status(200).json(results);
  }

  public awayLeaderboard = async (_req: Request, res: Response) => {
    const results = await this._leaderboardService.leaderboard('away');

    res.status(200).json(results);
  }
}