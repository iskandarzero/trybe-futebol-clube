import Teams from '../database/models/teams.model';

export default class TeamsService {
  public async getAll() {
    const result = await Teams.findAll();

    return result;
  }
}