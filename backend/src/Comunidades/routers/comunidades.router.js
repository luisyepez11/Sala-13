import { Router } from "express";
import {
  getComunidades,
  getComunidade,
  getComunidadesBusqueda,
  crearComunidades,
  agregarUsuariosAComunidades,
    getComunidadesUsuarios,
} from "../controllers/comunidades.controllers.js";

const router = Router();

// Obtener todas las listas
router.get("/", getComunidades);



// Crear una nueva lista
router.post("/", crearComunidades);

// Agregar una película a una lista
router.post("/agregarUsuariosAComunidades", agregarUsuariosAComunidades);


router.get("/getComunidadesUsuarios/:id", getComunidadesUsuarios);

router.get("/getComunidadesBusqueda/:id",getComunidadesBusqueda)

router.get("/getComunidade/:id",getComunidade)


export default router;