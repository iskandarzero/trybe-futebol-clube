import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team.model';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
  teamHome!: { teamName: string; };
  teamAway!: { teamName: string; };
}

Match.init({
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
  modelName: 'match',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
