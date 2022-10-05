import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match.model';

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

const mockCreated = {
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

describe('Rota GET /matches', () => {
  describe('Se a rota chamar todos os times', () => {
    let getMatches: Response;

    before(async () => {
      sinon.stub(Match, 'findAll').resolves(mockedMatches as Match[]);

      try {
        getMatches = await chai.request(app)
          .get('/matches').send();
      } catch (error) {
        console.error(error);
      }
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
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
      sinon.stub(Match, 'findAll').resolves([mockedMatches[1]] as Match[]);

      try {
        getMatches = await chai.request(app)
          .get('/matches?inProgress=true').send();
      } catch (error) {
        console.error(error);
      }
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
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

describe('Rota POST /matches', () => {
  describe('Se a rota recebe dados corretos', () => {
    let postMatches: Response;

    before(async () => {
      sinon.stub(Match, 'create').resolves({id: 255, ...mockCreated} as Match);

      try {
        postMatches = await chai.request(app)
          .post('/matches').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjY0NzgyMjcxfQ.N0jbBn8PL07-vsPjsqDHxNHKak0lqSvUjQBYXaHcvKw').send(mockCreated);
      } catch (error) {
        console.error(error);
      }
    });

    after(()=>{
      (Match.create as sinon.SinonStub).restore();
    })

    it('Checa se a aplicação retorna um status 201', async () => {
      const { status } = postMatches;

      expect(status).to.be.equals(201);
    })

    it('Checa se a aplicação retorna todos as partidas em progresso', async () => {
      const { body } = postMatches;

      expect(body).to.eql({id: 255, ...mockCreated});
    })
  })
})