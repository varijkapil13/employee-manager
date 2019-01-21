import express from 'express';
import UserController from '../controllers/user.controller';
import AuthorizationController from '../auth/authorization.controller';
const routes = express.Router();

// sign ip with avatar id
routes.post('/signup/:avatarId', UserController.signUpWithAvatar);
routes.post('/signup', UserController.signUp);
routes.post('/login', [UserController.login, AuthorizationController.login]);

export default routes;
