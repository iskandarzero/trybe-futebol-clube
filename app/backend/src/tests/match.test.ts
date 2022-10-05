import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match.model';

import mockMatch from './mocks/match.mock';
import mockToken from './mocks/token.mock';
import createMatchMock from './mocks/createMatch.mock'

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota GET /matches', () => {
  describe('Se a rota pode chamar todos os itens', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(mockMatch.allMatches as Match[]);
    });

    after(()=>{
      sinon.restore();
    })

    it('Checa se a aplicação retorna um status 200 com todas as partidas', async () => {
      const getMatches = await chai.request(app).get('/matches').send();
      const { status, body } = getMatches;

      expect(status).to.be.equals(200);
      expect(body).to.eql(mockMatch.allMatches);
    })
  })

  describe('Se a rota pode chamar apenas os jogos em progresso', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(mockMatch.matchesInProgress as Match[]);
    });

    after(()=>{
      sinon.restore();
    })

    it('Checa se a aplicação retorna um status 200 e todas as partidas em progresso', async () => {
      const getMatches = await chai.request(app)
        .get('/matches?inProgress=true').send();
      const { status, body } = getMatches;

      expect(status).to.be.equals(200);
      expect(body).to.eql(mockMatch.matchesInProgress);
    })
  })
});

describe('Rota POST /matches', () => {
  describe('Caso o token seja invalido', () => {
    it('A aplicação retorna um status 401 e uma mensagem', async () => {
      const postMatch = await chai.request(app).post('/matches')
      .set('authorization', mockToken.invalidToken).send(createMatchMock.validMatch);
      const { status, body } = postMatch;

      expect(status).to.be.equals(401);
      expect(body.message).to.be.equals('Token must be a valid token');
    })
  })

  describe('Caso os dados sejam incorretos', () => {
    it('Se os ids dos times forem iguais retorna um status 401 e uma mensagem', async () => {
      const postMatch = await chai.request(app).post('/matches')
      .set('authorization', mockToken.validToken).send(createMatchMock.sameIds);
      const { status, body } = postMatch;

      expect(status).to.be.equals(401);
      expect(body.message).to.be.equals('It is not possible to create a match with two equal teams');
    })
  })

  describe('Caso o algum id não exista', () => {
    it('Se o id do time de casa não existir retorna um status 404 e uma mensagem', async () => {
      const postMatch = await chai.request(app).post('/matches')
      .set('authorization', mockToken.validToken).send(createMatchMock.fakeHomeTeam);
      const { status, body } = postMatch;

      expect(status).to.be.equals(404);
      expect(body.message).to.be.equals('There is no team with such id!');
    })

    it('Se o id do time de fora não existir retorna um status 404 e uma mensagem', async () => {
      const postMatch = await chai.request(app).post('/matches')
      .set('authorization', mockToken.validToken).send(createMatchMock.fakeAwayTeam);
      const { status, body } = postMatch;

      expect(status).to.be.equals(404);
      expect(body.message).to.be.equals('There is no team with such id!');
    })
  })

  describe('Se a rota recebe dados corretos', () => {
    before(async () => {
      sinon.stub(Match, 'create').resolves({id: 49, ...createMatchMock.validMatch} as Match);
    });

    after(()=>{
      sinon.restore();
    })

    it('Checa se a aplicação retorna um status 201 e a partida criada', async () => {
      const postMatches = await chai.request(app).post('/matches')
      .set('authorization', mockToken.validToken).send(createMatchMock.validMatch);
      const { status, body } = postMatches;

      expect(status).to.be.equals(201);
      expect(body).to.eql({id: 49, ...createMatchMock.validMatch});
    })
  })
})

describe('Rota PATCH /matches/:id/finish', () => {
  describe('Se o id existir', () => {
    before(async () => {
      sinon.stub(Match, 'update').resolves(undefined);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('Checa se um jogo pode ser finalizado', async () => {
      const patchMatch = await chai.request(app).patch('/matches/44/finish');
      const { status, body } = patchMatch;
  
      expect(status).to.be.equals(200);
      expect(body.message).to.be.equals('Finished');
    })
  })
  
  describe('Se o id não existir', () => {
    it('Checa se a aplicação retorna um status 401 e uma mensagem', async () => {
      const patchMatch = await chai.request(app).patch('/matches/404/finish');
      const { status, body } = patchMatch;
  
      expect(status).to.be.equals(401);
      expect(body.message).to.be.equals('There is no team with such id!');
    })
  })
})