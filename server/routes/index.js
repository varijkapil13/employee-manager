import express from 'express';
const routes = express.Router();
import users from './users';
import avatars from './avatars';
import workday from './workday';
import leave from './leave';
import holiday from './holiday';

routes.use('/user', users);
routes.use('/avatar', avatars);
routes.use('/workday', workday);
routes.use('/leave', leave);
routes.use('/holiday', holiday);

export default routes;

