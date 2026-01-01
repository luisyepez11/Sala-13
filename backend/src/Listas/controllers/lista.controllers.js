import { pool } from "../../db.js";

export const getListas = async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [listas] = await connection.query("SELECT * FROM listas");
		res.status(200).json(listas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las listas" });
	} finally {
		if (connection) connection.release();
	}
};

function decodificarParametroURL(cadena) {
	let resultado = cadena.replace(/\+/g, ' ');
	return decodeURIComponent(resultado);
}

export const getListasBusqueda = async (req, res) => {
	let connection;
	try {
		const listaId = req.params.id;
		if (!listaId) {
			return res.status(400).json({ message: "El parámetro listaId es requerido" });
		}
		connection = await pool.getConnection();
		const [listas] = await connection.query(`
			SELECT * FROM listas 
			WHERE nombreLista LIKE ?;
		`, ['%' + decodificarParametroURL(listaId) + '%']);
		
		res.status(200).json(listas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las listas" });
	} finally {
		if (connection) connection.release();
	}
};

export const getListasUsuarios = async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [listas] = await connection.query("SELECT * FROM listas WHERE idCuenta = ?", [req.params.id]);
		res.status(200).json(listas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las listas" });
	} finally {
		if (connection) connection.release();
	}
};

export const getPeliculasDeLista = async (req, res) => {
	const listaId = req.params.id;
	let connection;
	try {
		connection = await pool.getConnection();
		const [peliculas] = await connection.query(
			`SELECT * FROM listaspeliculas WHERE idLista = ?`,
			[listaId]
		);
		res.status(200).json(peliculas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las películas de la lista" });
	} finally {
		if (connection) connection.release();
	}
};

export const getLista = async (req, res) => {
	const listaId = req.params.id;
	let connection;
	try {
		connection = await pool.getConnection();
		const [peliculas] = await connection.query(
			`SELECT l.*,c.* FROM listas l INNER JOIN cuentas c ON c.idcuenta=l.idCuenta WHERE idlista = ?`,
			[listaId]
		);
		res.status(200).json(peliculas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las películas de la lista" });
	} finally {
		if (connection) connection.release();
	}
};

export const crearLista = async (req, res) => {
	const { nombreLista, descripcion, idCuenta } = req.body;
	let connection;
	try {
		connection = await pool.getConnection();
		const [result] = await connection.query(
			"INSERT INTO listas (nombreLista, descripcion, idCuenta) VALUES (?, ?, ?)",
			[nombreLista, descripcion, idCuenta]
		);
		res.status(201).json({ id: result.insertId, nombreLista, descripcion, idCuenta });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al crear la lista" });
	} finally {
		if (connection) connection.release();
	}
};

export const agregarPeliculaALista = async (req, res) => {
	const { idLista, idPelicula } = req.body;
	let connection;
	try {
		connection = await pool.getConnection();
		await connection.query(
			"INSERT INTO listaspeliculas (idLista, idPelicula) VALUES (?, ?)",
			[idLista, idPelicula]
		);
		res.status(201).json({ message: "Película agregada a la lista" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al agregar la película a la lista" });
	} finally {
		if (connection) connection.release();
	}
};

export const eliminarPeliculaDeLista = async (req, res) => {
	const { idLista, idPelicula } = req.body;
	let connection;
	try {
		connection = await pool.getConnection();
		await connection.query(
			"DELETE FROM listaspeliculas WHERE idLista = ? AND idPelicula = ?",
			[idLista, idPelicula]
		);
		res.status(200).json({ message: "Película eliminada de la lista" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al eliminar la película de la lista" });
	} finally {
		if (connection) connection.release();
	}
}
