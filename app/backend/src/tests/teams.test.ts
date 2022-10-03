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
    "team_name": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "team_name": "Bahia"
  },
  {
    "id": 3,
    "team_name": "Botafogo"
  },
];

describe('Rota GET /teams', () => {
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
});