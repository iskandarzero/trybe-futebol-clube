import MatchesService from '../services/matches.service';
import { Request, Response } from 'express';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  public getAll = async (req: Request, res: Response) => {
    const search = req.query.inProgress;
    let matches;
    const isTrueSet = (search === 'true');
    

    if(search) {
      console.log('entrou');
      matches = await this._matchesService.getByProgress(isTrueSet);
    } else {
      matches = await this._matchesService.getAll();
    }

    res.status(200).json(matches);
  }
}