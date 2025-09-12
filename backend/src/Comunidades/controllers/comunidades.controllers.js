import { pool } from "../../db.js";

export const getComunidades = async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [listas] = await connection.query("SELECT * FROM cominidades");
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

export const getComunidadesBusqueda = async (req, res) => {
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

export const getComunidadesUsuarios = async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [listas] = await connection.query("SELECT co.*,c.* FROM comunidadescuentas co INNER JOIN  cominidades c ON co.idComunidad=c.idcominidad WHERE idCuenta = ?", [req.params.id]);
		res.status(200).json(listas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las listas" });
	} finally {
		if (connection) connection.release();
	}
};

export const getComunidadesDeLista = async (req, res) => {
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

export const getComunidade = async (req, res) => {
	const listaId = req.params.id;
	let connection;
	try {
		connection = await pool.getConnection();
		const [peliculas] = await connection.query(
			`SELECT l.*,c.* FROM cominidades l INNER JOIN cuentas c ON c.idcuenta=l.idCuenta WHERE idcominidad = ?`,
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

export const crearComunidades = async (req, res) => {
	const { nombreComunidad, descripcion, idCreador } = req.body;
	let connection;
	try {
		connection = await pool.getConnection();
		const [result] = await connection.query(
			"INSERT INTO cominidades (nombreComunidad, descripcionCominidad, idCreador) VALUES (?, ?, ?)",
			[nombreComunidad, descripcion, idCreador]
		);
		const [resultComunidad] = await connection.query(
			"INSERT INTO comunidadescuentas (idComunidad, idCuenta) VALUES (?, ?)",
			[result.insertId, idCreador]
		);
		res.status(201).json({ id: result.insertId, nombreComunidad, descripcion, idCreador });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al crear la lista" });
	} finally {
		if (connection) connection.release();
	}
};

export const agregarUsuariosAComunidades = async (req, res) => {
	const { idComunidad, idUsuario } = req.body;
	let connection;
	try {
		connection = await pool.getConnection();
		await connection.query(
			"INSERT INTO comunidadescuentas (idComunidad, idCuenta) VALUES (?, ?)",
			[idComunidad, idUsuario]
		);
		res.status(201).json({ message: "Película agregada a la lista" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al agregar la película a la lista" });
	} finally {
		if (connection) connection.release();
	}
};

export const eliminarComunidadesDeLista = async (req, res) => {
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
