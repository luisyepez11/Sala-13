import { Router } from 'express';
import {solicitudAmigo,getAmigos} from '../controllers/amigos.controllers.js';

const router = Router();

router.post("/insertAmigo",solicitudAmigo)
router.get("/amigos/:id",getAmigos)

export default router;