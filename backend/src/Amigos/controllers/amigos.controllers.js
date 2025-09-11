import { pool } from "../../db.js";

export const solicitudAmigo = async(req,res) =>{
	let connection;
	try {
		const {idReceptor,idUsuario,idsolicitudes} = req.body
		connection = await pool.getConnection();
		await connection.query(`INSERT INTO amigos (idReceptor,idUsuario) VALUES (?,?)`,[idReceptor,idUsuario])
		await connection.query(`UPDATE solicitudes SET solicitudes.estado="Activo" where solicitudes.idsolicitudes = ?`,[idsolicitudes])
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al aceptar la solicitud"
		})
	} finally {
		if (connection) connection.release();
	}
}
export const getAmigosId= async(req,res) =>{
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT a.*,c.nombreCuenta FROM amigos a  INNER JOIN cuentas c ON c.idcuenta=a.idReceptor WHERE idUsuario=?` ,[id])
        res.status(201).json(data[0])
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}

export const getAmigos = async(req,res) =>{
	let connection;
	try {
		const id = req.params.id
		connection = await pool.getConnection();
		const [data] = await connection.query(`SELECT solicitudes.idsolicitudes,m.nombreCuenta as nombremanda,m.idcuenta as idManda FROM solicitudes inner join cuentas as m on solicitudes.idUsuario=m.idcuenta WHERE solicitudes.idReceptor=?`,[id])
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener amigos"
		})
	} finally {
		if (connection) connection.release();
	}
}
