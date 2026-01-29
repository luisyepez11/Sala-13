import { Router } from "express";
import {
getPeliculasDeFavoritas,
agregarPeliculaAFavoritas,
eliminarPeliculaDeFavoritas
} from "../controllers/favorita.controllers.js";

const router = Router();


router.get("/:id", getPeliculasDeFavoritas);
router.post("/agregarPeliculaAFavoritas", agregarPeliculaAFavoritas);
router.delete("/eliminarPeliculaDeFavoritas", eliminarPeliculaDeFavoritas);



export default router;