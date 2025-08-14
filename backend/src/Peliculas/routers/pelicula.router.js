import { Router } from 'express';
import {getPeliculas,getPelicula,getPeliculasGenero} from '../controllers/pelicula.controllers.js';

const router = Router();

router.get("/",getPeliculas)
router.get("/:id",getPeliculasGenero)
router.get("/getPelicula/:id",getPelicula)
export default router;