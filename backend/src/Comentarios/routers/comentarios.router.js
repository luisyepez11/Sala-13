import { Router } from 'express';
import {insertComentario,getComentarios,getComentariosLanding} from '../controllers/comentarios.controllers.js';

const router = Router();

router.post("/",insertComentario)
router.get('/pelicula/:id',getComentarios)
router.get("/comentarios",getComentariosLanding)

export default router;