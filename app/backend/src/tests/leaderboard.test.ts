import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';

import mockTeams from './mocks/team.mock';
import mockLeaderboard from './mocks/leaderboard.mock';
import mockMatch from './mocks/match.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota GET /leaderboard', () => {
  describe('Rota /leaderboard/home', () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(mockTeams.allTeams as Team[]);
      sinon.stub(Match, 'findAll').resolves(mockMatch.notInProgress as Match[])
    });
    
    after(()=> {
      sinon.restore();
    })

    it('Checa se retorna status 200 e o leaderboard de times da casa', async () => {
      const getLogin = await chai.request(app).get('/leaderboard/home').send();
      const { status, body } = getLogin;

      expect(status).to.be.equals(200);
      expect(body).to.eql(mockLeaderboard.homeLeaderboard);
    })
  });

  describe('Rota /leaderboard/away', () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(mockTeams.allTeams as Team[]);
      sinon.stub(Match, 'findAll').resolves(mockMatch.notInProgress as Match[])
    });
    
    after(()=> {
      sinon.restore();
    })

    it('Checa se retorna status 200 e o leaderboard de times de fora', async () => {
      const getLogin = await chai.request(app).get('/leaderboard/away').send();
      const { status, body } = getLogin;

      expect(status).to.be.equals(200);
      expect(body).to.eql(mockLeaderboard.awayLeaderboard);
    })
  });

  describe('Rota /leaderboard/', () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(mockTeams.allTeams as Team[]);
      sinon.stub(Match, 'findAll').resolves(mockMatch.notInProgress as Match[])
    });
    
    after(()=> {
      sinon.restore();
    })

    it('Checa se retorna status 200 e o leaderboard geral', async () => {
      const getLogin = await chai.request(app).get('/leaderboard').send();
      const { status, body } = getLogin;

      expect(status).to.be.equals(200);
      expect(body).to.eql(mockLeaderboard.leaderboard);
    })
  });
});