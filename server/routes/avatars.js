import express from 'express';
const routes = express.Router();
import AvatarController from '../controllers/avatar.controller';

routes.get('/', AvatarController.list);
routes.put('/:avatarId', AvatarController.modify);
routes.delete('/:avatarId', AvatarController.delete);

export default routes;
