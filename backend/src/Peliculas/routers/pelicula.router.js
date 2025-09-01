import { Router } from 'express';
import {getPeliculas,getPelicula,getPeliculasGenero,getBusquedaPeliculas} from '../controllers/pelicula.controllers.js';

const router = Router();

router.get("/",getPeliculas)
router.get("/genero/:id",getPeliculasGenero)
router.get("/busqueda/:id",getBusquedaPeliculas)
router.get("/getPelicula/:id",getPelicula)
export default router;