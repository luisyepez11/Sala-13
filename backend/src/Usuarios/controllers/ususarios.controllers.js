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
        
        const [result] = await pool.query("SELECT * FROM usuarios WHERE nombreUsuario=?",[user])
        const validacion = result?.length ? bcrypt.compareSync(password,(result[0]).contraseñaUsuario) : false

        if (validacion){
            const token = jwt.sign({ idUser:(result[0]).idCuenta }, SALT)

            // === OPCIONES DE COOKIE SEGÚN ENTORNO ===
            const isProd = process.env.NODE_ENV === 'production'
            const cookieOptions = {
                httpOnly: true,
                secure: isProd ? true : false,   // en dev (localhost) -> false
                sameSite: isProd ? 'none' : 'lax', // en dev -> 'lax'
                maxAge: 60 * 60 * 24 * 1000,    // 1 día
                path: '/',                      // asegura que sea válida para todo el sitio
            }

            res.cookie("Login", token, cookieOptions)
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
        if (tokend == undefined){
            return res.json({
                message:"no registrado"
            })
        }
        const validar = jwt.verify(tokend, SALT)
        console.log(validar.idUser)
        return res.json({
            id: validar.idUser
        })
    } catch (error) {
        return res.json({
            message:error
        })
    }
}

export const deleteCookie = async(req,res) =>{
    try {
        // === LIMPIEZA DE COOKIE SEGÚN ENTORNO ===
        const isProd = process.env.NODE_ENV === 'production'
        res.clearCookie('Login', {
            httpOnly: true,
            secure: isProd ? true : false,     // en dev (localhost) -> false
            sameSite: isProd ? 'none' : 'lax', // en dev -> 'lax'
            path: '/',                          // mismo path que al crear
        })
        res.json({
            message:"funcionando"
        })
    } catch (error) {
        console.log("error")
        res.json({
            message:error
        }) 
    }
}
