import express from 'express';
import HolidayController from '../controllers/holiday';

const routes = express.Router();

routes.post('/', HolidayController.addHoliday);
routes.delete('/', HolidayController.deleteHoliday);
routes.get('/', HolidayController.getAllHolidays);

export default routes;
