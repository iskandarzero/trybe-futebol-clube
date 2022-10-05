import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRoute = Router();

const teamController = new TeamController();

teamRoute.get('/', teamController.getAll);
teamRoute.get('/:id', teamController.getById);

export default teamRoute;
