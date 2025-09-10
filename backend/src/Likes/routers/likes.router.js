import { Router } from 'express';
import {insertLikes} from '../controllers/likes.controllers.js';

const router = Router();

router.post("/",insertLikes)


export default router;