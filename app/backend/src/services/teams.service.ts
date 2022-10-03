import Teams from '../database/models/teams.model';

export default class TeamsService {
  public async getAll() {
    const result = await Teams.findAll();

    return result;
  }

  public async getByid(id: number) {
    const result = await Teams.findOne({ where: { id } });

    return result;
  }
}