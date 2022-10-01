import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
const bcrypt = require('bcryptjs');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota POST /login', () => {
  describe('quando os dados do `body` são válidos', () => {
    let postLogin: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          id: 1,
          username: 'User',
          role: 'user',
          email: "user@user.com",
          password: "banana"
        } as User);

      sinon.stub(bcrypt, "compare").resolves(true);

      try {
        postLogin = await chai.request(app)
          .post('/login')
          .send({
            email: "user@user.com",
            password: "banana"
          });
      } catch (error) {
        console.error(error);
      }
    });
    
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('retorna 200', async () => {
      const { status } = postLogin;

      expect(status).to.be.equals(200);
    })
  })
});
