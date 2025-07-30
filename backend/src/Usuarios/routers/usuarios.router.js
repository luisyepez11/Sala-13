import { Router } from 'express';
import {insertUser,loginUser,getUser,deleteCookie} from '../controllers/ususarios.controllers.js';

const router = Router();

router.post("/create",insertUser)
router.post("/login",loginUser)
router.get("/user",getUser)
router.get('/delete',deleteCookie)
export default router;