import express from 'express';
import multer from 'multer';
import WorkdayController from '../controllers/workday.controller';

const routes = express.Router();
const upload = multer({storage: multer.memoryStorage()});

routes.post('/:avatarId/upload', upload.single('reportFile'), WorkdayController.importTimelyFile);
routes.post('/:avatarId', WorkdayController.addWorkday);

export default routes;
