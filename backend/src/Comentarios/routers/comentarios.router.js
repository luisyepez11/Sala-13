import { Router } from 'express';
import {insertComentario,getComentarios} from '../controllers/comentarios.controllers.js';

const router = Router();

router.post("/",insertComentario)
router.get('/:id',getComentarios)

export default router;