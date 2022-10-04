import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';

export default class MatchesService {
  public async getAll() {
    const result = await Matches.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } } ]
    });

    return result;
  }

  public async getByProgress(status: boolean) {
    const result = await Matches.findAll({where: { inProgress: status }, include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } } ]
    });

    return result;
  }

  public async createMatch(match: any) {
    const result = await Matches.create(match);

    return result;
  } 
}