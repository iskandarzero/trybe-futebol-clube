import MatchesService from '../services/matches.service';
import { Request, Response } from 'express';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  public getAll = async (req: Request, res: Response) => {
    const search = req.query.inProgress;
    let matches;
    
    if(search) {
      const isTrueSet = (search === 'true');
      matches = await this._matchesService.getByProgress(isTrueSet);
    } else {
      matches = await this._matchesService.getAll();
    }

    res.status(200).json(matches);
  }

  public createMatch = async (req: Request, res: Response) => {
    const matchInfo = req.body;
    const match = await this._matchesService.createMatch(matchInfo);

    res.status(201).json(match);
  }
}