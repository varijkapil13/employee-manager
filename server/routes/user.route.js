import express from 'express';
import UserController from '../controllers/user.controller';
import AuthorizationController from '../auth/authorization.controller';
import configuration from '../common/env.config';
import PermissionController from '../auth/permission.controller';
import AuthorizationValidationController from '../auth/authorization.validation.controller';

const ADMIN = configuration.permissions.ADMIN;

const routes = express.Router();

// sign ip with avatar id
routes.post('/signup/:avatarId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(ADMIN),
  UserController.signUpWithAvatar
]);
routes.post('/signup', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(ADMIN),
  UserController.signUp
]);

routes.post('/login', [UserController.login, AuthorizationController.login]);

routes.get('/', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(ADMIN),
  UserController.getAllUsers
]);
routes.get('/:userId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(ADMIN),
  UserController.getUser
]);

export default routes;
