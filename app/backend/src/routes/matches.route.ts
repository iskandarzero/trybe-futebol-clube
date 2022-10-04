import MatchesController from '../controllers/matches.controller';
import { Router } from 'express';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.getAll);
matchesRoute.post('/', matchesController.createMatch);

export default matchesRoute;