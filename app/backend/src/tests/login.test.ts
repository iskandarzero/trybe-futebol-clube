import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user.model';
const bcrypt = require('bcryptjs');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota POST /login', () => {
  describe('quando os dados do `body` são válidos', () => {
    let postLogin: Response;

    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'User',
          role: 'user',
          email: 'user@user.com',
          password: 'hashedPassword'
        } as User);

      sinon.stub(bcrypt, 'compare').resolves(true);

      try {
        postLogin = await chai.request(app)
          .post('/login')
          .send({
            email: 'user@user.com',
            password: 'banana'
          });
      } catch (error) {
        console.error(error);
      }
    });
    
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
      (bcrypt.compare as sinon.SinonStub).restore();
    })

    it('retorna 200', async () => {
      const { status } = postLogin;

      expect(status).to.be.equals(200);
    })

    it('Retorna um token do tipo string', async () => {
      const { body } = postLogin;
      
      expect(body.token).to.be.a('string');
    })
  })

  describe('Quando os dados do `body` não são válidos', async () => {
    describe('Caso o usuário não exista no banco', async () => {
      let postLogin: Response;

      before(async () => {
        sinon.stub(User, 'findOne').resolves(undefined);

        try {
          postLogin = await chai.request(app)
            .post('/login')
            .send({
              email: 'random@random.com',
              password: 'maca'
            });
        } catch (error) {
          console.error(error);
        }
      });

      after(()=>{
        (User.findOne as sinon.SinonStub).restore();
      })

      it('Retorna 401', async () => {
        const { status } = postLogin;

        expect(status).to.be.equals(401);
      })

      it('Retorna a mensagem `Incorrect email or password`', async () => {
        const { body } = postLogin;
        
        expect(body.message).to.be.equals('Incorrect email or password');
      })
    })

    describe('Caso a senha esteja incorreta', async () => {
      let postLogin: Response;

      before(async () => {
        sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'User',
          role: 'user',
          email: 'user@user.com',
          password: 'hashedPassword'
        } as User);

        sinon.stub(bcrypt, 'compare').resolves(false);

        try {
          postLogin = await chai.request(app)
            .post('/login')
            .send({
              email: 'user@user.com',
              password: 'maca'
            });
        } catch (error) {
          console.error(error);
        }
      });

      after(()=>{
        (User.findOne as sinon.SinonStub).restore();
        (bcrypt.compare as sinon.SinonStub).restore();
      })

      it('Retorna 401', async () => {
        const { status } = postLogin;

        expect(status).to.be.equals(401);
      })

      it('Retorna a mensagem `Incorrect email or password`', async () => {
        const { body } = postLogin;
        
        expect(body.message).to.be.equals('Incorrect email or password');
      })
    })
  })
});

// describe('Rota GET /login/validate', async () => {
//   describe('Caso o token seja válido', () => {
//     let getLogin: Response;

//     before(async () => {
//       sinon
//         .stub(User, 'findOne')
//         .resolves({
//           role: 'user',
//         } as User);

//       try {
//         getLogin = await chai.request(app)
//           .post('/login/validate').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjY0NzgyMjcxfQ.N0jbBn8PL07-vsPjsqDHxNHKak0lqSvUjQBYXaHcvKw');
//       } catch (error) {
//         console.error(error);
//       }
//     });
    
//     after(()=>{
//       (User.findOne as sinon.SinonStub).restore();
//     })

//     it('Retorna 200', async () => {
//       const { status } = getLogin;

//       expect(status).to.be.equals(200);
//     })
//   })
// })
