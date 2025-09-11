import { pool } from "../../db.js";

export const solicitudAmigo = async(req,res) =>{
	let connection;
	try {
		const {idReceptor,idUsuario} = req.body
		connection = await pool.getConnection();
		await connection.query(`INSERT INTO solicitudes (idReceptor,idUsuario,estado) VALUES (?,?,?)`,[idReceptor,idUsuario,"pendiente"])
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al enviar solicitud"
		})
	} finally {
		if (connection) connection.release();
	}
}
export const getSolicitudes = async(req,res) =>{
	let connection;
	try {
		const id = req.params.id
		connection = await pool.getConnection();
		const [data] = await connection.query(`SELECT solicitudes.idsolicitudes,m.nombreCuenta as nombremanda,m.idcuenta as idManda FROM b3zs7ppnycr3kdwuxumu.solicitudes inner join b3zs7ppnycr3kdwuxumu.cuentas as m on solicitudes.idUsuario=m.idcuenta WHERE solicitudes.idReceptor=? AND solicitudes.estado=?`,[id,"pendiente"])
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener solicitudes"
		})
	} finally {
		if (connection) connection.release();
	}
}
