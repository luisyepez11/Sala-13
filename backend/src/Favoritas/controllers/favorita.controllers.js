import { pool } from "../../db.js";





export const getPeliculasDeFavoritas= async (req, res) => {
	const idCuenta = req.params.id;
	
	try {
		const peliculas = await pool.query(
			`SELECT * FROM favoritas WHERE "idCuenta" = $1`,
			[idCuenta]
		);
		
		res.status(200).json(peliculas.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al obtener las películas Favoritas ` });
	} 
};

export const agregarPeliculaAFavoritas= async (req, res) => {
	const { idCuenta, idPelicula } = req.body;
	try {
		await pool.query(
			`INSERT INTO favoritas ("idCuenta", "idPelicula") VALUES ($1, $2)`,
			[idCuenta, idPelicula]
		);
		res.status(201).json({ message: `Película agregada a Favoritos` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al agregar la película a Favoritos` });
	} 
};

export const eliminarPeliculaDeFavoritas= async (req, res) => {
	const { idCuenta, idPelicula } = req.body;
	try {
		await pool.query(
			`DELETE FROM favoritas WHERE "idCuenta" = $1 AND "idPelicula" = $2`,
			[idCuenta, idPelicula]
		);
		res.status(200).json({ message: `Película eliminada de Favoritos` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error al eliminar la película de Favoritos` });
	} 
}
