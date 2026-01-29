import { pool } from "../../db.js";

export const getCuenta = async(req,res) =>{
	try {
		const idCuenta = req.params.id;
		const resultCuenta = await pool.query(`
SELECT 
    cu."idCuenta",
    cu.*,
    COUNT(DISTINCT CASE WHEN s.estado = 'pendiente' THEN s."idSolicitudes" END) as total_solicitudes,
    COUNT(DISTINCT ase."idAmigos") as total_seguidos,
    COUNT(DISTINCT aseg."idAmigos") as total_seguidores,
    COUNT(DISTINCT c."idComentario") as total_comentarios,
    COUNT(DISTINCT l."idLike") as total_likes,
    COUNT(DISTINCT v."idVistas") as total_vistas
FROM 
    cuentas cu
LEFT JOIN 
    solicitudes s ON s."idReceptor" = cu."idCuenta" AND s.estado = 'pendiente'
LEFT JOIN 
    amigos ase ON ase."idCuenta" = cu."idCuenta"
LEFT JOIN 
    amigos aseg ON aseg."idReceptor" = cu."idCuenta"
LEFT JOIN 
    comentarios c ON c."idCuenta" = cu."idCuenta"
LEFT JOIN 
    likes l ON l."idCuenta" = cu."idCuenta"
LEFT JOIN 
    vistas v ON v."idCuenta" = cu."idCuenta"
WHERE 
    cu."idCuenta" = $1
GROUP BY 
    cu."idCuenta";
		`,[idCuenta])
		res.status(200).json(resultCuenta.rows[0])
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message:"error al obtener la cuenta"
		})
	}
}

export const updateCuenta = async(req,res) =>{
    try {
        const idCuenta = req.params.id;
        const {nombreReal, descripcionCuenta, nombreCuenta, fotoPerfil} = req.body;
        
        
        const resultCuenta = await pool.query(
            `UPDATE cuentas SET "nombreReal"=$1, "descripcionCuenta"=$2, "nombreCuenta"=$3, "fotoPerfil"=$4 WHERE "idCuenta" = $5`,
            [nombreReal, descripcionCuenta, nombreCuenta, fotoPerfil, idCuenta] 
        );
        
        res.status(200).json(resultCuenta.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error al actualizar la cuenta"
        });
    } 
}
