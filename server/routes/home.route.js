import express from 'express';
import configuration from '../common/env.config';
import HomeController from '../controllers/home.controller';

const {ADMIN, MANAGER, USER} = configuration.permissions;

const routes = express.Router();

routes.get('/:avatarId', [
  // AuthorizationValidationController.validJWTNeeded,
  // PermissionController.minimumPermissionRequired(USER),
  HomeController.getHomeViewDataForUser
]);

export default routes;
