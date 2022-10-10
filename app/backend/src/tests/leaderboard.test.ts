import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';

import mockTeams from './mocks/team.mock';
import mockLeaderboard from './mocks/leaderboard.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota GET /leaderboard', () => {
  describe('Rota /leaderboard/home', () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(mockTeams.allTeams as Team[]);
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
  })
});