import { pool } from "../../db.js";

export const insertComentario = async(req,res) =>{
	
	try {
		const {idCuenta,idPelicula,comentario,fecha,nombrePelicula,valoracion} = req.body
		await pool.query(`INSERT INTO comentarios ("idCuenta","idPelicula",comentario,fecha,"nombrePelicula",valoracion) VALUES ($1,$2,$3,$4,$5,$6)`,[idCuenta,idPelicula,comentario,fecha,nombrePelicula,valoracion])
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al insertar comentario"
		})
	} 
}

export const getComentarios = async(req,res) =>{
	
	try {
		const id = req.params.id
		
		const data = await pool.query(`SELECT * FROM comentarios LEFT JOIN cuentas ON comentarios."idCuenta" = cuentas."idCuenta" WHERE "idPelicula"=$1`,[id])
		res.status(200).json(data.rows)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener comentarios"
		})
	} 
}

export const getComentariosUsuario = async(req,res) =>{
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT * FROM comentarios LEFT JOIN cuentas ON comentarios."idCuenta" = cuentas."idCuenta" WHERE cuentas."idCuenta"=$1`,[id])
        res.status(201).json(data.rows)
    } catch (error) {
        console.log(error)
        res.json({
            message:error
        })
    }
}
export const getComentariosLanding = async(req,res) =>{
	
	try {
		
		const data = await pool.query(`SELECT comentarios.*,cuentas.* FROM comentarios INNER JOIN cuentas ON comentarios."idCuenta"=cuentas."idCuenta";`)
		res.status(200).json(data.rows)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener comentarios de landing"
		})
	} 
}
