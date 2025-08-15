import { pool } from "../../db.js";
import axios from 'axios';
axios.defaults.withCredentials = true;
export const solicitudAmigo= async(req,res) =>{
    try {
        const {idReceptor,idUsuario} = req.body
        console.log(idUsuario)
        const data = await pool.query(`INSERT INTO solicitudes (idReceptor,idUsuario,estado) VALUES (?,?,?)`,[idReceptor,idUsuario,"pendiente"])
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
export const getSolicitudes= async(req,res) =>{
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT solicitudes.idsolicitudes,m.nombreCuenta as nombremanda,m.idcuenta as idManda FROM b3zs7ppnycr3kdwuxumu.solicitudes inner join b3zs7ppnycr3kdwuxumu.cuentas as m on solicitudes.idUsuario=m.idcuenta WHERE solicitudes.idReceptor=? AND solicitudes.estado=?`,[id,"pendiente"])
        res.status(201).json(data[0])
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}



