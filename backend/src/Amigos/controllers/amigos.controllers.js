import { pool } from "../../db.js";
import axios from 'axios';
axios.defaults.withCredentials = true;
export const solicitudAmigo= async(req,res) =>{
    try {
        const {idReceptor,idUsuario,idsolicitudes} = req.body
        const data = await pool.query(`INSERT INTO amigos (idReceptor,idUsuario) VALUES (?,?)`,[idReceptor,idUsuario])
        const actualizar = await pool.query(`UPDATE  solicitudes SET solicitudes.estado="Activo" where solicitudes.idsolicitudes = ?`,[idsolicitudes])
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
export const getAmigos= async(req,res) =>{
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT solicitudes.idsolicitudes,m.nombreCuenta as nombremanda,m.idcuenta as idManda FROM solicitudes inner join cuentas as m on solicitudes.idUsuario=m.idcuenta WHERE solicitudes.idReceptor=?`,[id])
        res.status(201).json(data[0])
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}



