import { pool } from "../../db.js";

export const getCuenta= async(req,res) =>{
    try {
        const idCuenta = req.params.id;
        const [resultCuenta] = await pool.query(`
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
        res.status(201).json({resultCuenta})
    } catch (error) {
        res.json({
            message:"error"
        })
    }
}
export const updateCuenta= async(req,res) =>{
    try {
        const idCuenta = req.params.id;
        const {nombreReal,descripcionCuenta,nombreCuenta} = req.body;
        const [resultCuenta] = await pool.query(`UPDATE cuentas SET nombreCuenta=? , descripcionCuenta=?,nombreReal=? WHERE idcuenta = ?`,[nombreReal,descripcionCuenta,nombreCuenta,idCuenta])
        console.log(resultCuenta)
        res.status(201).json({resultCuenta})
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}


