import express from 'express';
import HolidayController from '../controllers/holiday.controller';
import AuthorizationValidationController from '../auth/authorization.validation.controller';
import PermissionController from '../auth/permission.controller';
import configuration from '../common/env.config';

const {ADMIN, MANAGER, USER} = configuration.permissions;

const routes = express.Router();

routes.post('/', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  HolidayController.addHoliday
]);
routes.delete('/:holidayId', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(MANAGER),
  HolidayController.deleteHoliday
]);
routes.get('/', [
  AuthorizationValidationController.validJWTNeeded,
  PermissionController.minimumPermissionRequired(USER),
  HolidayController.getAllHolidays
]);

export default routes;
