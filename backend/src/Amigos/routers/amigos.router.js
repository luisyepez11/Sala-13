import { Router } from 'express';
import {solicitudAmigo,getAmigos,getAmigosId} from '../controllers/amigos.controllers.js';

const router = Router();

router.post("/insertAmigo",solicitudAmigo)
router.get("/amigos/:id",getAmigos)
router.get("/getAmigosId/:id",getAmigosId)

export default router;