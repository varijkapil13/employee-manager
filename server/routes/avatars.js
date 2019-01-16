import express from 'express';
const routes = express.Router();
import Avatars from "../controllers/avatar";

routes.get('/', Avatars.list);
routes.put('/:avatarId', Avatars.modify);
routes.delete('/:avatarId', Avatars.delete);

export default routes;