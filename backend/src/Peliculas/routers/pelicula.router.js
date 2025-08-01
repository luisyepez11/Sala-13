import { Router } from 'express';
import {getPeliculas,getPelicula} from '../controllers/pelicula.controllers.js';

const router = Router();

router.get("/",getPeliculas)
router.get("/getPelicula/:id",getPelicula)
export default router;