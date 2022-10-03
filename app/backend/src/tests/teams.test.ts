import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const mockedTeams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
];

describe('Rota GET /teams', () => {
  describe('Se a rota chamar todos os times', () => {
    let getTeams: Response;

    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(mockedTeams as Teams[]);

      try {
        getTeams = await chai.request(app)
          .get('/teams').send();
      } catch (error) {
        console.error(error);
      }
    });

    after(()=>{
      (Teams.findAll as sinon.SinonStub).restore();
    })

    it('Checa se a aplicação retorna um status 200', async () => {
      const { status } = getTeams;

      expect(status).to.be.equals(200);
    })

    it('Checa se a aplicação retorna todos os times', async () => {
      const { body } = getTeams;

      expect(body).to.eql(mockedTeams);
    })
  })

  describe('Se a rota chamar um id específico', () => {
    let getTeams: Response;

    before(async () => {
      sinon.stub(Teams, 'findOne').resolves(mockedTeams[0] as Teams);

      try {
        getTeams = await chai.request(app)
          .get('/teams/1').send();
      } catch (error) {
        console.error(error);
      }
    });

    after(()=>{
      (Teams.findOne as sinon.SinonStub).restore();
    })

    it('Checa se a aplicação retorna um status 200', async () => {
      const { status } = getTeams;

      expect(status).to.be.equals(200);
    })

    it('Checa se a aplicação retorna todos os times', async () => {
      const { body } = getTeams;

      expect(body).to.eql(mockedTeams[0]);
    })
  })
});