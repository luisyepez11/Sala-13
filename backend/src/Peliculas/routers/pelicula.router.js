import { Router } from 'express';
import {getPelicula} from '../controllers/pelicula.controllers.js';

const router = Router();

router.get("/getPelicula",getPelicula)

export default router;