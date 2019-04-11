import express from 'express';
import users from './user.route';
import avatars from './avatar.route';
import workday from './workday.route';
import leave from './leave.route';
import holiday from './holiday.route';
import home from './home.route';
import overtime from './overtime.route';

const routes = express.Router();

routes.use('/users', users);
routes.use('/avatars', avatars);
routes.use('/workdays', workday);
routes.use('/leaves', leave);
routes.use('/holidays', holiday);
routes.use('/home', home);
routes.use('/overtime', overtime);

export default routes;
