import MatchesService from '../services/matches.service';
import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';

export default class MatchesController {
  constructor(
    private _matchesService = new MatchesService(),
    private _teamsService = new TeamsService) {}

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

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._matchesService.finishMatch(Number(id));

    res.status(200).json({ message: 'Finished' })
  }

  public validateMatch = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' })
    }

    const teamHome = await this._teamsService.getByid(Number(homeTeam));
    const teamAway = await this._teamsService.getByid(Number(awayTeam));

    if (!teamHome || !teamAway) {
      return res.status(404).json({ message: 'There is no team with such id!' })
    }

    next();
  }
}