import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';

export default class MatchesService {
  public async getAll() {
    const result = Matches.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } } ]
    });

    return result;
  }

  public async getByProgress(status: boolean) {
    console.log(status, typeof status);
    const result = Matches.findAll({where: { inProgress: status }, include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } } ]
    });

    return result;
  }
}