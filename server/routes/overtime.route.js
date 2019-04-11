import express from 'express';
import OvertimeController from '../controllers/overtime.controller';
import configuration from '../common/env.config';

const ADMIN = configuration.permissions.ADMIN;

const routes = express.Router();

// get overtime for all users
routes.get('/', [
  // AuthorizationValidationController.validJWTNeeded,
  // PermissionController.minimumPermissionRequired(ADMIN),
  OvertimeController.getAll
]);

export default routes;
