import { pool } from "../../db.js";

export const solicitudAmigo = async(req,res) =>{
	try {
		const {idReceptor,idCuenta,idSolicitudes} = req.body
		await pool.query('BEGIN')
		await pool.query(`INSERT INTO amigos ("idReceptor","idCuenta") VALUES ($1,$2)`,[idReceptor,idCuenta])
		await pool.query(`UPDATE solicitudes SET estado='Activo' where "idSolicitudes" = $1`,[idSolicitudes])
		await pool.query('COMMIT')
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		await pool.query('ROLLBACK')
		console.log(error)
		res.status(500).json({
			message:"error al aceptar la solicitud"
		})
	} 
}
export const getAmigosId= async(req,res) =>{
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT a.*,c."nombreCuenta" FROM amigos a  INNER JOIN cuentas c ON c."idCuenta"=a."idReceptor" WHERE a."idCuenta"=$1` ,[id])
        res.status(201).json(data.rows)
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}

export const getAmigos = async(req,res) =>{
	try {
		const id = req.params.id
		
		const data = await pool.query(`SELECT solicitudes."idSolicitudes",m."nombreCuenta" as nombremanda,m."idCuenta" as idManda FROM solicitudes inner join cuentas as m on solicitudes."idCuenta"=m."idCuenta" WHERE solicitudes."idReceptor"=$1`,[id])
		res.status(200).json(data.rows)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener amigos"
		})
	} 
}
