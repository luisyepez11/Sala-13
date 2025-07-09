import { Router } from 'express';
import {getCuenta} from '../controllers/cuentas.controllers.js';

const router = Router();

router.get("/getCuenta/:id",getCuenta)

export default router;