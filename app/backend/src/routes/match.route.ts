import MatchController from '../controllers/match.controller';
import { Router } from 'express';

const matchRoute = Router();

const matchController = new MatchController();

matchRoute.get('/', matchController.getAll);
matchRoute.post(
  '/',
  matchController.validateToken,
  matchController.validateMatch,
  matchController.createMatch);
matchRoute.patch('/:id/finish', matchController.finishMatch);
matchRoute.patch('/:id', matchController.updateMatch);

export default matchRoute;