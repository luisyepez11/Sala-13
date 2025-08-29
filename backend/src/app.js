import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
//Usuarios
import usuarioRouter from "./Usuarios/routers/usuarios.router.js";
//Cuentas
import cuentaRouter from "./Cuentas/routers/cuentas.router.js";
//Peliculas
import peliculaRouter from "./Peliculas/routers/pelicula.router.js";
//Comentarios
import comentarioRouter from "./Comentarios/routers/comentarios.router.js";
//Solicitudes
import solicitudesRouter from "./Solicitudes/routers/solicitudes.router.js";
//Amigos
import amigosRouter from "./Amigos/routers/amigos.router.js";
<<<<<<< HEAD
//Listas
import listaRouter from "./Listas/routers/lista.router.js";
=======

>>>>>>> 5d3cfc1f16b7d0ed4541f67e704cccaa14538e41

const app = express()

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(json());
app.use(cookieParser())

//Usuarios
app.use("/api/usuario",usuarioRouter)
//Cuentas
app.use("/api/cuenta",cuentaRouter)
//Peliculas
app.use("/api/pelicula",peliculaRouter)
//Comentarios
app.use("/api/comentario",comentarioRouter)
//Solicitudes
app.use("/api/solicitud",solicitudesRouter)
//Amigos
app.use("/api/amigo",amigosRouter)
<<<<<<< HEAD
//Listas
app.use("/api/lista", listaRouter) 
=======
>>>>>>> 5d3cfc1f16b7d0ed4541f67e704cccaa14538e41

export default app;