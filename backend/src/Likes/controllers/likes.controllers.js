import { pool } from "../../db.js";

export const insertLikes = async(req,res) =>{
	
	try {
		const {idCuenta,idPelicula} = req.body

		await pool.query(`INSERT INTO likes ("idCuenta","idPelicula") VALUES ($1,$2)`,[idCuenta,idPelicula])
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al insertar like"
		})
	} 
}

export const getLikes = async(req,res) =>{
	
	try {
		const id = req.params.id

		const [data] = await pool.query(`SELECT * FROM comentarios LEFT JOIN cuentas ON comentarios.idCuenta = cuentas.idcuenta WHERE idPelicula=?`,[id])
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener likes"
		})
	} 
}

export const getLikesUsuario = async(req,res) =>{
	
	try {
		const id = req.params.id

		const data = await pool.query(`SELECT * FROM likes LEFT JOIN cuentas ON likes."idCuenta" = cuentas."idCuenta" WHERE cuentas."idCuenta"=$1`,[id])
		res.status(200).json(data.rows)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener likes"
		})
	} 
}

export const getLikesLanding = async(req,res) =>{
	
	try {

		const [data] = await pool.query(`SELECT comentarios.*,cuentas.nombreCuenta,cuentas.nombreReal FROM comentarios INNER JOIN cuentas ON comentarios.idCuenta=cuentas.idcuenta;`)
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener likes de landing"
		})
	} 
}
