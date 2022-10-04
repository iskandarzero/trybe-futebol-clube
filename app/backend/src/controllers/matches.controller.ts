import MatchesService from '../services/matches.service';
import { Request, Response } from 'express';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this._matchesService.getAll();

    res.status(200).json(matches);
  }
}