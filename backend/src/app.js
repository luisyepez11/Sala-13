import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// Usuarios
import usuarioRouter from "./Usuarios/routers/usuarios.router.js"
// Cuentas
import cuentaRouter from "./Cuentas/routers/cuentas.router.js"
// Películas
import peliculaRouter from "./Peliculas/routers/pelicula.router.js"
// Comentarios
import comentarioRouter from "./Comentarios/routers/comentarios.router.js"
// Solicitudes
import solicitudesRouter from "./Solicitudes/routers/solicitudes.router.js"
// Amigos
import amigosRouter from "./Amigos/routers/amigos.router.js"
=======
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

const app = express()

// 🔧 Configurable por entorno (en prod puedes poner tu dominio real del front)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173"

// ✅ Middlewares (orden recomendado)
app.use(cookieParser()) // leer req.cookies

app.use(cors({
  origin: FRONTEND_ORIGIN, // origen del frontend
  credentials: true        // necesario para enviar/recibir cookies
}))

app.use(json())            // body parser

// ✅ Rutas
app.use("/api/usuario", usuarioRouter)
app.use("/api/cuenta", cuentaRouter)
app.use("/api/pelicula", peliculaRouter)
app.use("/api/comentario", comentarioRouter)
app.use("/api/solicitud", solicitudesRouter)
app.use("/api/amigo", amigosRouter)

export default app
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
//Listas
app.use("/api/lista", listaRouter) 

export default app;
