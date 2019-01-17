import express from 'express';
import UserController from '../controllers/user.controller';

const routes = express.Router();

// sign ip with avatar id
routes.post('/signup/:avatarId', UserController.signUpWithAvatar);
routes.post('/signup', UserController.signUp);
routes.post('/login', UserController.login);

export default routes;
