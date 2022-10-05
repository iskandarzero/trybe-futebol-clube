import MatchService from '../services/match.service';
import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/team.service';
import Token from '../auth/token';

export default class MatchController {
  constructor(
    private _matchService = new MatchService(),
    private _teamService = new TeamService,
    private _token = new Token()) {}

  public getAll = async (req: Request, res: Response) => {
    const search = req.query.inProgress;
    let matches;
    
    if(search) {
      const isTrueSet = (search === 'true');
      matches = await this._matchService.getByProgress(isTrueSet);
    } else {
      matches = await this._matchService.getAll();
    }

    res.status(200).json(matches);
  }

  public createMatch = async (req: Request, res: Response) => {
    const matchInfo = req.body;
    const match = await this._matchService.createMatch(matchInfo);

    res.status(201).json(match);
  }

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this._matchService.finishMatch(Number(id));

    if (result.code === 401) return res.status(401).json({ message: 'There is no match with such id!' })

    res.status(200).json({ message: 'Finished' })
  }

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const userInfo = this._token.decodeToken(token);
    
    if (!userInfo) return res.status(401).json({ message: 'Token must be a valid token' });

    next();
  }

  public validateMatch = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' })
    }

    const teamHome = await this._teamService.getByid(Number(homeTeam));
    const teamAway = await this._teamService.getByid(Number(awayTeam));

    if (!teamHome || !teamAway) {
      return res.status(404).json({ message: 'There is no team with such id!' })
    }

    next();
  }

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await this._matchService.updateMatch(Number(id), data);

    if (result.code === 401) return res.status(401).json({ message: 'There is no match with such id!' });

    res.status(200).json({ message: 'Updated' });
  }
}