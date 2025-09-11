import { pool } from "../../db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { SALT } from "../../config.js";

export const insertUser = async (req, res) => {
	let connection;
	try {
		const { user, password } = req.body;
		const passwordCryp = await bcrypt.hash(password, 10)
		
		connection = await pool.getConnection();
		
		const [resultCuenta] = await connection.query(`INSERT INTO cuentas (nombreCuenta,descripcionCuenta) VALUES(?,?)`, [user, ""])
		await connection.query(`INSERT INTO usuarios (nombreUsuario,contraseñaUsuario,idCuenta) VALUES(?,?,?)`, [user, passwordCryp, resultCuenta.insertId]);
		
		res.status(201).json({
			message: "cuenta y usuario creado"
		})
	} catch (error) {
		res.status(500).json({
			message: "error al crear usuario"
		})
	} finally {
		if (connection) connection.release();
	}
}

export const loginUser = async (req, res) => {
	let connection;
	try {
		const { user, password } = req.body
		
		connection = await pool.getConnection();
		const [result] = await connection.query("SELECT * FROM usuarios WHERE nombreUsuario=?", [user])
		
		const validacion = result?.length ? bcrypt.compareSync(password, (result[0]).contraseñaUsuario) : false

		if (validacion) {
			const token = jwt.sign({ idUser: (result[0]).idCuenta }, SALT)

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
			message: ""
		})
	} catch (error) {
		res.status(500).json({
			message: "error en el login"
		})
	} finally {
		if (connection) connection.release();
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
			id: validar.idUser
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
