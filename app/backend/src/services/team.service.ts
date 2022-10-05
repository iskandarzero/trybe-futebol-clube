import Team from '../database/models/team.model';

export default class TeamService {
  public async getAll() {
    const result = await Team.findAll();

    return result;
  }

  public async getByid(id: number) {
    const result = await Team.findOne({ where: { id } });

    return result;
  }
}