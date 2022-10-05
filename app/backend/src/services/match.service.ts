import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import IMatch from '../interfaces/match.interface';

export default class MatchService {
  public async getAll() {
    const result = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } } ]
    });

    return result;
  }

  public async getByProgress(status: boolean) {
    const result = await Match.findAll({where: { inProgress: status }, include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } } ]
    });

    return result;
  }

  public async createMatch(match: IMatch) {
    const result = await Match.create(match);

    return result;
  }

  public async finishMatch(id: number) {
    const result = await Match.findOne({ where: { id }});

    if (result) {
      await result.update({ inProgress: false });
      await result.save();
    }
  }
}