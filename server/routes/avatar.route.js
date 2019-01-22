import express from 'express';
const routes = express.Router();
import AvatarController from '../controllers/avatar.controller';
import PermissionController from '../auth/permission.controller';
import AuthorizationValidationController from '../auth/authorization.validation.controller';
import configuration from '../common/env.config';

const {ADMIN, MANAGER, USER} = configuration.permissions;

routes.get('/', [AuthorizationValidationController.validJWTNeeded, PermissionController.minimumPermissionRequired(MANAGER), AvatarController.list]);
routes.put('/:avatarId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  AvatarController.modify
]);
routes.delete('/:avatarId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  AvatarController.delete
]);

export default routes;
