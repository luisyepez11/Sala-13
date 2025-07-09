import { pool } from "../../db.js";

export const getCuenta= async(req,res) =>{
    try {
        const idCuenta = req.params.id;
        const [resultCuenta] = await pool.query(`SELECT * FROM cuentas where idcuenta = ?`,[idCuenta])
        res.status(201).json({resultCuenta})
    } catch (error) {
        res.json({
            message:"error"
        })
    }
}


