import express from 'express';
import LeaveController from '../controllers/leave.controller';

const routes = express.Router();

routes.post('/:avatarId', LeaveController.addLeave);
routes.delete('/:leaveId', LeaveController.deleteLeave);
routes.get('/', LeaveController.getAllLeaves);

export default routes;
