import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import IMatch from '../interfaces/match.interface';
import UpdateMatch from '../interfaces/updateMatch.interface';

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

    if (!result) return { code: 401 };

    await result.update({ inProgress: false });
    await result.save();

    return { code: 200 };
  }

  public async updateMatch(id: number, data: UpdateMatch) {
    const result = await Match.findOne({ where: { id }});

    if (!result) return { code: 401 };

    await result.update(data);
    await result.save();

    return { code: 200 };
  }
}