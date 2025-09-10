import { Router } from "express";
import {
  getListas,
  getPeliculasDeLista,
  crearLista,
  agregarPeliculaALista,
  eliminarPeliculaDeLista,
    getListasUsuarios,
    getListasBusqueda,
    getLista
} from "../controllers/lista.controllers.js";

const router = Router();

// Obtener todas las listas
router.get("/", getListas);

// Obtener las películas de una lista específica
router.get("/getPeliculasDeLista/:id", getPeliculasDeLista);

// Crear una nueva lista
router.post("/", crearLista);

// Agregar una película a una lista
router.post("/agregarPelicula", agregarPeliculaALista);

// Eliminar una película de una lista
router.delete("/eliminarPelicula", eliminarPeliculaDeLista);

router.get("/getListasUsuarios/:id", getListasUsuarios);

router.get("/getListasBusqueda/:id",getListasBusqueda)

router.get("/getLista/:id",getLista)


export default router;