import express from 'express';
import User from '../controllers/user';

const routes = express.Router();

// sign ip with avatar id
routes.post('/signup/:avatarId', User.signUpWithAvatar);
routes.post('/signup', User.signUp);

export default routes;
