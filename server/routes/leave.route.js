import express from 'express';
import LeaveController from '../controllers/leave.controller';
import configuration from '../common/env.config';
import AuthorizationValidationController from '../auth/authorization.validation.controller';
import PermissionController from '../auth/permission.controller';

const {MANAGER, USER} = configuration.permissions;
const routes = express.Router();

routes.post('/:avatarId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(USER),
  LeaveController.addLeave
]);

routes.post('/multi/:avatarId', [
  // AuthorizationValidationController.validJWTNeeded,
  // PermissionController.minimumPermissionRequired(USER),
  LeaveController.addMultipleLeaves
]);
routes.delete('/:leaveId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  LeaveController.deleteLeave
]);
routes.get('/', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  LeaveController.getAllLeaves
]);
routes.get('/:avatarId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(USER),
  LeaveController.getUserLeaves
]);

export default routes;
