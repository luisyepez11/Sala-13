import { pool } from "../../db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { SALT } from "../../config.js";
import cookieParser from 'cookie-parser';

export const insertUser= async(req,res) =>{
    try {
        const {user,password} = req.body;
        const passwordCryp = await bcrypt.hash(password,10)
        const [resultCuenta] = await pool.query(`INSERT INTO cuentas (nombreCuenta,descripcionCuenta) VALUES(?,?)`,[user,""])
        const [resultUser] = await pool.query(`INSERT INTO usuarios (nombreUsuario,contraseñaUsuario,idCuenta) VALUES(?,?,?)`,[user,passwordCryp,resultCuenta.insertId]);
        res.status(201).json({
            message:"cuenta y usuario creado"
        })
        console.log("creado")
    } catch (error) {
        res.json({
            message:"error"
        })
    }
}
export const loginUser = async(req,res) =>{
    try {
        const {user,password} = req.body
        
        const [result] =await pool.query("SELECT * FROM usuarios WHERE nombreUsuario=?",[user])
        const validacion = bcrypt.compareSync(password,(result[0]).contraseñaUsuario)
        if(validacion){
            const token = jwt.sign({ idUser:(result[0]).idCuenta},SALT)
            res.cookie("Login",token,{
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 60 * 60 * 24 * 1000
                });
        }
        res.json({
            message:""
        })
    } catch (error) {
        console.log("no funcion")
        res.json({
            message:"error"
        })
    }
}
export const getUser = async(req,res) =>{
    try {
        const tokend = req.cookies.Login
        const validar = jwt.verify(tokend,SALT)
        console.log(validar.idUser)
        res.json({
            message:validar.idUser
        })
    } catch (error) {
        res.json({
            message:"error"
        })
    }
        
}

