import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsRoute = Router();

const teamsController = new TeamsController();

teamsRoute.get('/', teamsController.getAll);
teamsRoute.get('/:id', teamsController.getById);

export default teamsRoute;
