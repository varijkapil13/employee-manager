import express from 'express';
import multer from 'multer';
import WorkdayController from '../controllers/workday.controller';
import PermissionController from '../auth/permission.controller';
import AuthorizationValidationController from '../auth/authorization.validation.controller';
import configuration from '../common/env.config';

const ADMIN = configuration.permissions.ADMIN;
const MANAGER = configuration.permissions.MANAGER;
const USER = configuration.permissions.USER;

const routes = express.Router();
const upload = multer({storage: multer.memoryStorage()});

routes.post('/:avatarId/upload', upload.single('reportFile'), [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  WorkdayController.importTimelyFile
]);
routes.post('/:avatarId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  WorkdayController.addWorkday
]);

export default routes;
