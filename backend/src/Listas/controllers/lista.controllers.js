import { pool } from "../../db.js";

export const getListas = async (req, res) => {
	try {
		const listas = await pool.query(`SELECT * FROM listas`);
		res.status(200).json(listas.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al obtener las listas` });
	} 
};

function decodificarParametroURL(cadena) {
	let resultado = cadena.replace(/\+/g, ' ');
	return decodeURIComponent(resultado);
}

export const getListasBusqueda = async (req, res) => {
	try {
		const listaId = req.params.id;
		if (!listaId) {
			return res.status(400).json({ message: `El parámetro listaId es requerido` });
		}
		const listas = await pool.query(`
			SELECT * FROM listas 
			WHERE "nombreLista" LIKE $1;
		`, ['%' + decodificarParametroURL(listaId) + '%']);
		
		res.status(200).json(listas.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al obtener las listas` });
	} 
};

export const getListasUsuarios = async (req, res) => {
	try {
		const listas = await pool.query(`SELECT * FROM listas WHERE "idCuenta" = $1`, [req.params.id]);
		res.status(200).json(listas.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al obtener las listas` });
	} 
};

export const getPeliculasDeLista = async (req, res) => {
	const listaId = req.params.id;
	
	try {
		const peliculas = await pool.query(
			`SELECT * FROM "listasPeliculas" WHERE "idLista" = $1`,
			[listaId]
		);
		
		res.status(200).json(peliculas.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al obtener las películas de la lista` });
	} 
};

export const getLista = async (req, res) => {
	const listaId = req.params.id;
	try {
		const peliculas = await pool.query(
			`SELECT l.*,c.* FROM listas l INNER JOIN cuentas c ON c."idCuenta"=l."idCuenta" WHERE "idLista" = $1`,
			[listaId]
		);
		res.status(200).json(peliculas.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al obtener las películas de la lista` });
	} 
};

export const crearLista = async (req, res) => {
	const { nombreLista, descripcion, idCuenta } = req.body;
	try {
		const result = await pool.query(
			`INSERT INTO listas ("nombreLista", descripcion, "idCuenta") VALUES ($1, $2, $3) RETURNING "idLista"`,
			[nombreLista, descripcion, idCuenta]
		);
		res.status(201).json({ id: result.rows[0].idLista, nombreLista, descripcion, idCuenta });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al crear la lista` });
	} 
};

export const agregarPeliculaALista = async (req, res) => {
	const { idLista, idPelicula } = req.body;
	try {
		await pool.query(
			`INSERT INTO "listasPeliculas" ("idLista", "idPelicula") VALUES ($1, $2)`,
			[idLista, idPelicula]
		);
		res.status(201).json({ message: `Película agregada a la lista` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al agregar la película a la lista` });
	} 
};

export const eliminarPeliculaDeLista = async (req, res) => {
	const { idLista, idPelicula } = req.body;
	try {
		await pool.query(
			`DELETE FROM "listasPeliculas" WHERE "idLista" = $1 AND "idPelicula" = $2`,
			[idLista, idPelicula]
		);
		res.status(200).json({ message: `Película eliminada de la lista` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al eliminar la película de la lista` });
	} 
}
