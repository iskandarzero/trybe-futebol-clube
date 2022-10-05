const createMatchMock = {
  validMatch: {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  },
  sameIds: {
    homeTeam: 7,
    awayTeam: 7,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  },
  fakeHomeTeam: {
    homeTeam: 404,
    awayTeam: 7,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  },
  fakeAwayTeam: {
    homeTeam: 7,
    awayTeam: 404,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  },
}

export default createMatchMock;