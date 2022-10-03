import TeamsService from '../services/teams.service';
import { Request, Response, NextFunction } from 'express';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {}

  public getAll = async (req: Request, res: Response) => {
    const teams = await this._teamsService.getAll();
    console.log(teams);

    res.status(200).json(teams);
  }
}