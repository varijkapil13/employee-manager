import express from 'express';
import multer from 'multer';
import Workday from '../controllers/workday';

const routes = express.Router();
const upload = multer({storage: multer.memoryStorage()});

routes.post('/:avatarId/upload', upload.single('reportFile'), Workday.importTimelyFile);
routes.post('/:avatarId', Workday.addWorkday);

export default routes;
