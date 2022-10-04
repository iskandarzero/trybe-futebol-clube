import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teams.model';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
  teamHome!: { teamName: string; };
  teamAway!: { teamName: string; };
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team'
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals'
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team'
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals'
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress'
  }
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
