import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
//Usuarios
import usuarioRouter from "./Usuarios/routers/usuarios.router.js";

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


export default app;