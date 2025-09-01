import { Router } from 'express';
import {getCuenta,updateCuenta} from '../controllers/cuentas.controllers.js';

const router = Router();

router.get("/getCuenta/:id",getCuenta)
router.put("/:id",updateCuenta)

export default router;