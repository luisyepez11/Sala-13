import { Router } from 'express';
import {solicitudAmigo,getSolicitudes} from '../controllers/solicitudes.controllers.js';

const router = Router();

router.post("/solicitudAmigo",solicitudAmigo)
router.get("/solicitudes/:id",getSolicitudes)

export default router;