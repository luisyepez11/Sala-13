import { Router } from 'express';
import {solicitudAmigo,getSolicitudes,pruebaSolicitud} from '../controllers/solicitudes.controllers.js';

const router = Router();

router.post("/solicitudAmigo",solicitudAmigo)
router.get("/solicitudes/:id",getSolicitudes)
router.post("/pruebaSolicitud",pruebaSolicitud)

export default router;