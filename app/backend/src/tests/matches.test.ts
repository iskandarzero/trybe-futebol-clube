import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockedMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
]

describe('Rota GET /matches', () => {
  describe('Se a rota chamar todos os times', () => {
    let getMatches: Response;

    before(async () => {
      sinon.stub(Matches, 'findAll').resolves(mockedMatches as Matches[]);

      try {
        getMatches = await chai.request(app)
          .get('/matches').send();
      } catch (error) {
        console.error(error);
      }
    });

    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Checa se a aplicação retorna um status 200', async () => {
      const { status } = getMatches;

      expect(status).to.be.equals(200);
    })

    it('Checa se a aplicação retorna todos as partidas', async () => {
      const { body } = getMatches;

      expect(body).to.eql(mockedMatches);
    })
  })

  describe('Se a rota chama todos os jogos em progresso', () => {
    let getMatches: Response;

    before(async () => {
      sinon.stub(Matches, 'findAll').resolves([mockedMatches[1]] as Matches[]);

      try {
        getMatches = await chai.request(app)
          .get('/matches?inProgress=true').send();
      } catch (error) {
        console.error(error);
      }
    });

    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Checa se a aplicação retorna um status 200', async () => {
      const { status } = getMatches;

      expect(status).to.be.equals(200);
    })

    it('Checa se a aplicação retorna todos as partidas em progresso', async () => {
      const { body } = getMatches;

      expect(body).to.eql([mockedMatches[1]]);
    })
  })
});