import { pool } from "../../db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { SALT } from "../../config.js";


export const insertUser = async (req, res) => {
    let client;
    try {
        const { user, password } = req.body;
        const passwordCryp = await bcrypt.hash(password, 10);
        
        await pool.query('BEGIN');
        const resultCuenta = await pool.query(`
            INSERT INTO cuentas ("nombreCuenta", "descripcionCuenta") 
            VALUES ($1, $2) 
            RETURNING "idCuenta"
        `, [user, ""]);
        
        const newAccountId = resultCuenta.rows[0].idCuenta;


        await pool.query(`
            INSERT INTO usuarios ("nombreUsuario", "contraseñaUsuario", "idCuenta") 
            VALUES ($1, $2, $3)
        `, [user, passwordCryp, newAccountId]);

        await pool.query('COMMIT');
        
        res.status(201).json({
            message: "cuenta y usuario creado"
        });

    } catch (error) {
        if (pool) await pool.query('ROLLBACK');
        console.error(error); 
        res.status(500).json({
            message: "error al crear usuario",
            error: error.message
        });

    } 
}

export const loginUser = async (req, res) => {
	try {
		const { user, password } = req.body
		
		const result = await pool.query(`SELECT * FROM usuarios WHERE "nombreUsuario"=$1 `, [user])
		console.log(result.rows)
		const validacion = bcrypt.compareSync(password, result.rows[0].contraseñaUsuario) 
		if (validacion) {
			const token = jwt.sign({ idUser: (result.rows[0]).idCuenta,nombreUsuario: (result.rows[0]).nombreUsuario}, SALT)
			console.log({ idUser: (result.rows[0]).idCuenta,nombreUsuario: (result.rows[0]).nombreUsuario})
			const isProd = process.env.NODE_ENV === 'production'
			const cookieOptions = {
				httpOnly: true,
				secure: isProd ? true : false,
				sameSite: isProd ? 'none' : 'lax',
				maxAge: 60 * 60 * 24 * 1000,
				path: '/',
			}

			res.cookie("Login", token, cookieOptions)
		}

		res.json({
			message: "funciono"
		})
	} catch (error) {
		res.status(500).json({
			message: "error en el login"
		})
		console.log(error)
	} 
}

export const getUser = async (req, res) => {
	try {
		const tokend = req.cookies.Login
		if (tokend == undefined) {
			return res.json({
				message: "no registrado"
			})
		}
		const validar = jwt.verify(tokend, SALT)
		return res.json({
			id: validar.idUser,
			nombre:validar.nombreUsuario
		})
	} catch (error) {
		return res.json({
			message: "token invalido"
		})
	}
}

export const deleteCookie = async (req, res) => {
	try {
		const isProd = process.env.NODE_ENV === 'production'
		res.clearCookie('Login', {
			httpOnly: true,
			secure: isProd ? true : false,
			sameSite: isProd ? 'none' : 'lax',
			path: '/',
		})
		res.json({
			message: "cookie eliminada"
		})
	} catch (error) {
		res.status(500).json({
			message: "error al eliminar cookie"
		})
	}
}
