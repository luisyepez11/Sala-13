import { pool } from "../../db.js";

export const solicitudAmigo = async(req,res) =>{

	try {
		const {idReceptor,idCuenta} = req.body
		await pool.query(`INSERT INTO solicitudes ("idReceptor","idCuenta",estado) VALUES ($1,$2,$3)`,[idReceptor,idCuenta,"pendiente"])
		res.status(201).json({
			message:"ok"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al enviar solicitud"
		})
	} 
}
export const getSolicitudes = async(req,res) =>{

	try {
		const id = req.params.id
		const data = await pool.query(`SELECT solicitudes."idSolicitudes",m."nombreCuenta" as nombremanda,m."idCuenta" as "idManda" FROM solicitudes inner join cuentas as m on solicitudes."idCuenta"=m."idCuenta" WHERE solicitudes."idReceptor"=$1 and solicitudes.estado=$2`,[id,"pendiente"])
		res.status(200).json(data.rows)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message:"error al obtener solicitudes"
		})
	} 
}

export const pruebaSolicitud = async (req, res) => {
    try {
        const { idUsuario, idReceptor } = req.body;
		console.log({ idUsuario, idReceptor })
        const query = `
            SELECT EXISTS (
                SELECT 1 
                FROM solicitudes 
                WHERE "idCuenta" = $1 AND "idReceptor" = $2
            ) AS "enviada";
        `;

        const result = await pool.query(query, [idUsuario, idReceptor]);
        
        res.status(200).json({
            solicitudEnviada: result.rows[0].enviada
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al verificar la solicitud"
        });
    }
};