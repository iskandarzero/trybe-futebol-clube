import LeaderboardService from '../services/leaderboard.service';
import { Request, Response } from 'express';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) {}

  public pt = async (_req: Request, res: Response) => {
    const teste = await this._leaderboardService.leaderboard();

    res.status(200).json(teste);
  }
}