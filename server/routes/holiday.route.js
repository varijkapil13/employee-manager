import express from 'express';
import HolidayController from '../controllers/holiday.controller';

const routes = express.Router();

routes.post('/', HolidayController.addHoliday);
routes.delete('/:holidayId', HolidayController.deleteHoliday);
routes.get('/', HolidayController.getAllHolidays);

export default routes;
