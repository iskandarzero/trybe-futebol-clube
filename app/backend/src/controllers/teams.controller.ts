import TeamsService from '../services/teams.service';
import { Request, Response } from 'express';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this._teamsService.getAll();

    res.status(200).json(teams);
  }

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._teamsService.getByid(Number(id));

    res.status(200).json(team);
  }
}