import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user.model';
const bcrypt = require('bcryptjs');

import mockUser from './mocks/user.mock';
import mockLogin from './mocks/login.mock';
import mockToken from './mocks/token.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota POST /login', () => {
  describe('quando os dados do `body` são válidos', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(mockUser.validUser as User);
      sinon.stub(bcrypt, 'compare').resolves(true);
    });
    
    after(()=> {
      sinon.restore();
    })

    it('A aplicação retorna um status 200 e um token', async () => {
      const postLogin = await chai.request(app).post('/login')
      .send(mockLogin.validInformation);
      const { status, body } = postLogin;

      expect(status).to.be.equals(200);
      expect(body).to.have.property('token');
    })
  })

  describe('Quando os dados do `body` não são válidos', () => {
    describe('Caso o email seja inválido', async () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves(undefined);
      });

      after(()=>{
        sinon.restore();
      })

      it('A aplicação retorna um status 401 e uma mensagem', async () => {
        const postLogin = await chai.request(app).post('/login')
        .send(mockLogin.invalidEmail);
        const { status, body } = postLogin;

        expect(status).to.be.equals(401);
        expect(body.message).to.be.equals('Incorrect email or password');
      })
    })

    describe('Caso a senha seja inválida', () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves(mockUser.validUser as User);
        sinon.stub(bcrypt, 'compare').resolves(false);
      });

      after(()=>{
        sinon.restore();
      })

      it('A aplicação retorna um status 401 e uma mensagem', async () => {
        const postLogin = await chai.request(app).post('/login')
        .send(mockLogin.invalidPassword);
        const { status, body } = postLogin;

        expect(status).to.be.equals(401);
        expect(body.message).to.be.equals('Incorrect email or password');
      })
    })

    describe('Caso o email não seja informado', () => {
      it('A aplicação retorna um status 400 e uma mensagem', async () => {
        const postLogin = await chai.request(app).post('/login')
        .send(mockLogin.missingEmail);
        const { status, body } = postLogin;

        expect(status).to.be.equals(400);
        expect(body.message).to.be.equals('All fields must be filled');
      })
    })

    describe('Caso a senha não seja informada', () => {
      it('A aplicação retorna um status 400 e uma mensagem', async () => {
        const postLogin = await chai.request(app).post('/login')
        .send(mockLogin.missingPassword);
        const { status, body } = postLogin;

        expect(status).to.be.equals(400);
        expect(body.message).to.be.equals('All fields must be filled');
      })
    })
  })
});

describe('Rota GET /login/validate', () => {
  describe('Caso o token seja válido', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(mockUser.role as User);
    });
    
    after(()=> {
      sinon.restore();
    })

    it('A aplicação retorna um status 200 e um role', async () => {
      const postLogin = await chai.request(app).get('/login/validate')
      .set('authorization', mockToken.validToken);
      const { status, body } = postLogin;

      expect(status).to.be.equals(200);
      expect(body).to.have.property('role');
    })
  })

  describe('Caso o token seja invalido', () => {
    it('A aplicação retorna um status 404 e uma mensagem', async () => {
      const postLogin = await chai.request(app).get('/login/validate')
      .set('authorization', mockToken.invalidToken);
      const { status, body } = postLogin;

      expect(status).to.be.equals(404);
      expect(body.message).to.be.equals('Invalid token');
    })
  })

  describe('Caso nenhum token seja informado', () => {
    it('A aplicação retorna um status 404 e uma mensagem', async () => {
      const postLogin = await chai.request(app).get('/login/validate');
      const { status, body } = postLogin;

      expect(status).to.be.equals(404);
      expect(body.message).to.be.equals('Invalid token');
    })
  })
});
