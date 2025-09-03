import { pool } from "../../db.js";
import axios from 'axios';
axios.defaults.withCredentials = true;
export const insertComentario= async(req,res) =>{
    try {
        const {idCuenta,idPelicula,comentario,fecha,nombrePelicula} = req.body
        console.log(nombrePelicula)
        const data = await pool.query(`INSERT INTO comentarios (idCuenta,idPelicula,comentario,fecha,nombrePelicula) VALUES (?,?,?,?,?)`,[idCuenta,idPelicula,comentario,fecha,nombrePelicula])
        res.status(201).json({
            message:"ok"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}
export const getComentarios = async(req,res) =>{
    try {
        const id = req.params.id
        console.log(id)
        const data = await pool.query(`SELECT * FROM comentarios LEFT JOIN cuentas ON comentarios.idCuenta = cuentas.idcuenta WHERE idPelicula=?`,[id])
        res.status(201).json(data[0])
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}
export const getComentariosLanding = async(req,res) =>{
    try {
        const data = await pool.query(`SELECT comentarios.*,cuentas.nombreCuenta,cuentas.nombreReal FROM comentarios INNER JOIN cuentas ON comentarios.idCuenta=cuentas.idcuenta;`)
        console.log(data)
        res.status(201).json(data[0])
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}


