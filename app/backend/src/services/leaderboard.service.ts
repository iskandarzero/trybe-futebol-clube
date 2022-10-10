import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
const { Op } = require('sequelize')

export default class LeaderboardService {
  public async allTeams() {
    const teams = await Team.findAll();

    return teams;
  }

  public async allMatches(id: number) {
    const matches = await Match.findAll({where: { [Op.or]: [{homeTeam: id}, {awayTeam: id}], inProgress: false } });

    return matches;
  }

  public async homeTeamMatches(id: number) {
    const matches = await Match.findAll({where: { homeTeam: id, inProgress: false } });

    return matches;
  }

  public async awayTeamMatches(id: number) {
    const matches = await Match.findAll({where: { awayTeam: id, inProgress: false } });

    return matches;
  }

  public async homeTeamResults(id: number, name: string) {
    const results = { id, name, win: 0, lose: 0, tie: 0, goals: {scored: 0, conceded: 0}};
    const matches = await this.homeTeamMatches(id);

    matches.map((p: any) => {
      results.goals.scored += p.homeTeamGoals;
      results.goals.conceded += p.awayTeamGoals;

      if (p.homeTeamGoals > p.awayTeamGoals) {
        return results.win += 1;
      } else if (p.homeTeamGoals === p.awayTeamGoals) {
        return results.tie += 1;
      } else return results.lose += 1;
    })

    return results;
  }

  public async awayTeamResults(id: number, name: string) {
    const results = { id, name, win: 0, lose: 0, tie: 0, goals: {scored: 0, conceded: 0}};
    const matches = await this.awayTeamMatches(id);

    matches.map((p: any) => {
      results.goals.scored += p.awayTeamGoals;
      results.goals.conceded += p.homeTeamGoals;

      if (p.awayTeamGoals > p.homeTeamGoals) {
        return results.win += 1;
      } else if (p.awayTeamGoals === p.homeTeamGoals) {
        return results.tie += 1;
      } else return results.lose += 1;
    })

    return results;
  }

  public async allResults(id: number, name: string) {
    const results = { id, name, win: 0, lose: 0, tie: 0, goals: {scored: 0, conceded: 0}};
    const matches = await this.allMatches(id);

    matches.map((p: any) => {
      if (id === p.homeTeam) {
        results.goals.scored += p.homeTeamGoals;
        results.goals.conceded += p.awayTeamGoals;

        if (p.homeTeamGoals > p.awayTeamGoals) {
          return results.win += 1;
        } else if (p.homeTeamGoals === p.awayTeamGoals) {
          return results.tie += 1;
        } else return results.lose += 1;
      } else {
        results.goals.scored += p.awayTeamGoals;
        results.goals.conceded += p.homeTeamGoals;

        if (p.awayTeamGoals > p.homeTeamGoals) {
          return results.win += 1;
        } else if (p.awayTeamGoals === p.homeTeamGoals) {
          return results.tie += 1;
        } else return results.lose += 1;
      }
    })

    return results;
  }

  public async leaderboard(homeOrAway: string) {
    const teams = await this.allTeams();
    let matches;

    if (homeOrAway === 'home') {
      matches = await Promise.all(teams.map(async (t) => await this.homeTeamResults(t.id, t.teamName)));
    } else if (homeOrAway === 'away') {
      matches = await Promise.all(teams.map(async (t) => await this.awayTeamResults(t.id, t.teamName)));
    } else {
      matches = await Promise.all(teams.map(async (t) => await this.allResults(t.id, t.teamName)));
    }

    const results = matches.map((match) => {
      const points = (match.win * 3) + (match.tie * 1);
      const game = match.win + match.tie + match.lose;
      const efficiencyCalc = (points / (game * 3) * 100).toFixed(2);

      const leaderboard = {
        name: match.name,
        totalPoints: points,
        totalGames: game,
        totalVictories: match.win,
        totalDraws: match.tie,
        totalLosses: match.lose,
        goalsFavor: match.goals.scored,
        goalsOwn: match.goals.conceded,
        goalsBalance: match.goals.scored - match.goals.conceded,
        efficiency: Number(efficiencyCalc)
      }

      return leaderboard;
    })

    const sortedResults = results
    .sort((a, b) => b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);

    return sortedResults;
  }
}