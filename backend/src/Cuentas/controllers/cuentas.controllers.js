import { pool } from "../../db.js";

export const getCuenta = async(req,res) =>{
	let connection;
	try {
		const idCuenta = req.params.id;
		connection = await pool.getConnection();
		const [resultCuenta] = await connection.query(`
			SELECT 
				cu.idcuenta,
				cu.*,
				COUNT(DISTINCT CASE WHEN s.estado = 'pendiente' THEN s.idsolicitudes END) as total_solicitudes,
				COUNT(DISTINCT ase.idamigos) as total_seguidos,
				COUNT(DISTINCT aseg.idamigos) as total_seguidores,
				COUNT(DISTINCT c.idcomentario) as total_comentarios
			FROM 
				cuentas cu
			LEFT JOIN 
				solicitudes s ON s.idReceptor = cu.idcuenta AND s.estado = 'pendiente'
			LEFT JOIN 
				amigos ase ON ase.idUsuario = cu.idcuenta
			LEFT JOIN 
				amigos aseg ON aseg.idReceptor = cu.idcuenta
			LEFT JOIN 
				comentarios c ON c.idCuenta = cu.idcuenta
			WHERE cu.idcuenta=?
			GROUP BY 
				cu.idcuenta
			ORDER BY 
				total_solicitudes DESC;
		`,[idCuenta])
		res.status(200).json({resultCuenta})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message:"error al obtener la cuenta"
		})
	} finally {
		if (connection) connection.release();
	}
}

export const updateCuenta = async(req,res) =>{
	let connection;
	try {
		const idCuenta = req.params.id;
		const {nombreReal,descripcionCuenta,nombreCuenta} = req.body;
		connection = await pool.getConnection();
		const [resultCuenta] = await connection.query(`UPDATE cuentas SET nombreReal=? , descripcionCuenta=?, nombreCuenta=? WHERE idcuenta = ?`,[nombreReal,descripcionCuenta,nombreCuenta,idCuenta])
		res.status(200).json({resultCuenta})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al actualizar la cuenta"
		})
	} finally {
		if (connection) connection.release();
	}
}
