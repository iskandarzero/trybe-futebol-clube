import TeamService from '../services/team.service';
import { Request, Response } from 'express';

export default class TeamsController {
  constructor(private _teamService = new TeamService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this._teamService.getAll();

    res.status(200).json(teams);
  }

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._teamService.getByid(Number(id));

    res.status(200).json(team);
  }
}