import { Router } from 'express';
import {insertLikes,getLikesUsuario} from '../controllers/likes.controllers.js';

const router = Router();

router.post("/",insertLikes)
router.get("/getUsuarioLike/:id",getLikesUsuario)

export default router;