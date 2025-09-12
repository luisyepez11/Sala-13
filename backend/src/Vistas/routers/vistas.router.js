import { Router } from 'express';
import {insertVistas,getVistasUsuario} from '../controllers/vistas.controllers.js';

const router = Router();

router.post("/",insertVistas)
router.get("/getVistasUsuario/:id",getVistasUsuario)

export default router;