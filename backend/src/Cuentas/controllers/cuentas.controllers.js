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
				COUNT(DISTINCT c.idcomentario) as total_comentarios,
                COUNT(DISTINCT l.idlike) as total_likes,
                COUNT(DISTINCT v.idvistas) as total_vistas
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
			LEFT JOIN 
				likes l ON cu.idcuenta = l.idCuenta
			LEFT JOIN 
				vistas v ON cu.idcuenta = v.idCuenta
			WHERE cu.idcuenta= ?
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
        const {nombreReal, descripcionCuenta, nombreCuenta, fotoPerfil} = req.body;
        
        connection = await pool.getConnection();
        
        const [resultCuenta] = await connection.query(
            `UPDATE cuentas SET nombreReal=?, descripcionCuenta=?, nombreCuenta=?, fotoPerfil=? WHERE idcuenta = ?`,
            [nombreReal, descripcionCuenta, nombreCuenta, fotoPerfil, idCuenta] 
        );
        
        res.status(200).json({resultCuenta});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error al actualizar la cuenta"
        });
    } finally {
        if (connection) connection.release();
    }
}
