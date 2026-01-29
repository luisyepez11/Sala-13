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
//Listas
import listaRouter from "./Listas/routers/lista.router.js";
//Like
import likeRouter from "./Likes/routers/likes.router.js";
//Vistas
import vistasRouter from "./Vistas/routers/vistas.router.js";
//Comunidades
import ComunidadesRouter from "./Comunidades/routers/comunidades.router.js";
//favoritos
import FavoritosRouter from "./Favoritas/routers/favorita.router.js";
const app = express()

// Middleware
const corsOptions = {
  origin: 'https://sala-13.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true, 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(json());


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
//Listas
app.use("/api/lista", listaRouter) 
//Like
app.use("/api/like", likeRouter) 
//Vistas
app.use("/api/vistas", vistasRouter) 
//Comunidades
app.use("/api/comunidades",ComunidadesRouter)
//favoritos
app.use("/api/favoritas",FavoritosRouter)
export default app;