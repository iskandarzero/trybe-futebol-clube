import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams.model';
import mockTeams from '../tests/mocks/teams.mock'


chai.use(chaiHttp);
const { expect } = chai;

describe('Rota GET /teams', () => {
  describe('Se a rota pode chamar todos os itens', () => {
    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(mockTeams.allTeams as Teams[]);
    });

    after(()=>{
      sinon.restore();
    })

    it('Checa se a aplicação retorna um status 200 com todos os times', async () => {
      const getTeams = await chai.request(app)
      .get('/teams').send();
      const { status, body } = getTeams;

      expect(status).to.be.equals(200);
      expect(body).to.eql(mockTeams.allTeams);
    })
  })

  describe('Se a rota receber um id, ela devolve um time específico', () => {
    before(async () => {
      sinon.stub(Teams, 'findOne').resolves(mockTeams.team as Teams);
    });

    after(()=>{
      sinon.restore();
    })

    it('Checa se a aplicação retorna um status 200 com o time especificado', async () => {
      const getTeams = await chai.request(app).get('/teams/7').send();
      const { status, body } = getTeams;

      expect(status).to.be.equals(200);
      expect(body).to.eql(mockTeams.team);
    })
  })
});