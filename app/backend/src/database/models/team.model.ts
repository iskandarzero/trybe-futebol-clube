import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
  teamHome!: { homeTeam: number, homeTeamGoals: number, awayTeam: number, awayTeamGoals: number, inProgress: boolean, };
  teamAway!: { homeTeam: number, homeTeamGoals: number, awayTeam: number, awayTeamGoals: number, inProgress: boolean, };
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
