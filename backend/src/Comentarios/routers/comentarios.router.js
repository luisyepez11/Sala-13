import { Router } from 'express';
import {insertComentario,getComentarios,getComentariosLanding,getComentariosUsuario} from '../controllers/comentarios.controllers.js';

const router = Router();

router.post("/",insertComentario)
router.get('/pelicula/:id',getComentarios)
router.get("/comentarios",getComentariosLanding)
router.get("/getComentariosUsuario/:id",getComentariosUsuario)

export default router;