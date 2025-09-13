import { pool } from "../../db.js";

export const insertComentario = async(req,res) =>{
	let connection;
	try {
		const {idCuenta,idPelicula,comentario,fecha,nombrePelicula,valoracion} = req.body
		console.log(valoracion)
		connection = await pool.getConnection();
		await connection.query(`INSERT INTO comentarios (idCuenta,idPelicula,comentario,fecha,nombrePelicula,valoracion) VALUES (?,?,?,?,?,?)`,[idCuenta,idPelicula,comentario,fecha,nombrePelicula,valoracion])
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al insertar comentario"
		})
	} finally {
		if (connection) connection.release();
	}
}

export const getComentarios = async(req,res) =>{
	let connection;
	try {
		const id = req.params.id
		connection = await pool.getConnection();
		const [data] = await connection.query(`SELECT * FROM comentarios LEFT JOIN cuentas ON comentarios.idCuenta = cuentas.idcuenta WHERE idPelicula=?`,[id])
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener comentarios"
		})
	} finally {
		if (connection) connection.release();
	}
}

export const getComentariosUsuario = async(req,res) =>{
    try {
        const id = req.params.id
        console.log(id)
        const data = await pool.query(`SELECT * FROM comentarios LEFT JOIN cuentas ON comentarios.idCuenta = cuentas.idcuenta WHERE cuentas.idcuenta=?`,[id])
        res.status(201).json(data[0])
    } catch (error) {
        console.log(error)
        res.json({
            message:error
        })
    }
}
export const getComentariosLanding = async(req,res) =>{
	let connection;
	try {
		connection = await pool.getConnection();
		const [data] = await connection.query(`SELECT comentarios.*,cuentas.* FROM comentarios INNER JOIN cuentas ON comentarios.idCuenta=cuentas.idcuenta;`)
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener comentarios de landing"
		})
	} finally {
		if (connection) connection.release();
	}
}
