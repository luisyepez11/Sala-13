import { Router } from 'express';
import {insertLikes,getLikesUsuario,pruebaPeliculaLike} from '../controllers/likes.controllers.js';

const router = Router();

router.post("/",insertLikes)
router.get("/getUsuarioLike/:id",getLikesUsuario)
router.get("/pruebaPeliculaLike",pruebaPeliculaLike)

export default router;