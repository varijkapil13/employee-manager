import express from 'express';
const routes = express.Router();
import users from './user.route';
import avatars from './avatar.route';
import workday from './workday.route';
import leave from './leave.route';
import holiday from './holiday.route';

routes.use('/users', users);
routes.use('/avatars', avatars);
routes.use('/workdays', workday);
routes.use('/leaves', leave);
routes.use('/holidays', holiday);

export default routes;
