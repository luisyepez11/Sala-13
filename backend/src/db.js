import pkg from 'pg';
const { Pool } = pkg;
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js";

// Configuración del Pool para PostgreSQL
export const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
  ssl: {
    rejectUnauthorized: false // Requerido para Supabase y conexiones externas
  }
});


pool.connect()
  .then((client) => {
    console.log("✅ Conexión exitosa a PostgreSQL (Supabase)");
    client.release();
  })
  .catch((err) => {
    console.error(" Error al conectarse a la base de datos:");

  
    switch (err.code) {
      case "ENOTFOUND":
        console.error(`Host no encontrado. Verifica que la URL "${DB_HOST}" sea correcta.`);
        break;

      case "ECONNREFUSED":
        console.error(`Conexión rechazada en ${DB_HOST}:${DB_PORT}. Verifica que el puerto sea 5432.`);
        break;

      case "28P01": 
        console.error(`Error de autenticación: El usuario (${DB_USER}) o la contraseña son incorrectos.`);
        break;

      case "3D000": 
        console.error(`La base de datos "${DB_DATABASE}" no existe.`);
        break;

      case "ETIMEDOUT":
        console.error(`Tiempo de espera agotado al conectar a ${DB_HOST}. Revisa tu internet o si el proyecto de Supabase está pausado.`);
        break;

      default:
        console.error("Detalle del error:", err);
        break;
    }
  });

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de conexiones:", err.message);
});