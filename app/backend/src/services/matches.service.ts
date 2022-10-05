import Teams from '../database/models/team.model';
import Matches from '../database/models/matches.model';
import IMatch from '../interfaces/match.interface';

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

  public async createMatch(match: IMatch) {
    const result = await Matches.create(match);

    return result;
  }

  public async finishMatch(id: number) {
    const result = await Matches.findOne({ where: { id }});

    if (result) {
      await result.update({ inProgress: false });
      await result.save();
    }
  }
}