import { pool } from "../../db.js";

export const insertLikes = async(req,res) =>{
	let connection;
	try {
		const {idCuenta,idPelicula} = req.body
		connection = await pool.getConnection();
		await connection.query(`INSERT INTO likes (idCuenta,idPelicula) VALUES (?,?)`,[idCuenta,idPelicula])
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al insertar like"
		})
	} finally {
		if (connection) connection.release();
	}
}

export const getLikes = async(req,res) =>{
	let connection;
	try {
		const id = req.params.id
		connection = await pool.getConnection();
		const [data] = await connection.query(`SELECT * FROM comentarios LEFT JOIN cuentas ON comentarios.idCuenta = cuentas.idcuenta WHERE idPelicula=?`,[id])
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener likes"
		})
	} finally {
		if (connection) connection.release();
	}
}

export const getLikesUsuario = async(req,res) =>{
	let connection;
	try {
		const id = req.params.id
		connection = await pool.getConnection();
		const [data] = await connection.query(`SELECT * FROM likes LEFT JOIN cuentas ON likes.idCuenta = cuentas.idcuenta WHERE cuentas.idcuenta=?`,[id])
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener likes"
		})
	} finally {
		if (connection) connection.release();
	}
}

export const getLikesLanding = async(req,res) =>{
	let connection;
	try {
		connection = await pool.getConnection();
		const [data] = await connection.query(`SELECT comentarios.*,cuentas.nombreCuenta,cuentas.nombreReal FROM comentarios INNER JOIN cuentas ON comentarios.idCuenta=cuentas.idcuenta;`)
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener likes de landing"
		})
	} finally {
		if (connection) connection.release();
	}
}
