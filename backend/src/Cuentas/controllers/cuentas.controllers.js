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


