import { pool } from "../../db.js";

export const getComunidades = async (req, res) => {
	try {
		const listas = await pool.query(`
			SELECT 
    c.*,
    COUNT(cc."idComunidadesCuentas") as cantidad_usuarios
FROM comunidades c
LEFT JOIN "comunidadesCuentas" cc ON c."idComunidad" = cc."idComunidad"
GROUP BY c."idComunidad";
			`);
		res.status(200).json(listas.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las listas" });
	} 
};

function decodificarParametroURL(cadena) {
	let resultado = cadena.replace(/\+/g, ' ');
	return decodeURIComponent(resultado);
}

export const getComunidadesBusqueda = async (req, res) => {
	try {
		const listaId = req.params.id;
		if (!listaId) {
			return res.status(400).json({ message: "El parámetro listaId es requerido" });
		}
		const [listas] = await pool.query(`
			SELECT * FROM listas 
			WHERE nombreLista LIKE ?;
		`, ['%' + decodificarParametroURL(listaId) + '%']);
		
		res.status(200).json(listas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las listas" });
	} 
};

export const getComunidadesUsuarios = async (req, res) => {
	try {
		const listas = await pool.query(`SELECT co.*,c.*,(SELECT count(*) FROM "comunidadesCuentas" where "comunidadesCuentas"."idComunidad"=co."idComunidad") AS total_seguidores FROM "comunidadesCuentas" co INNER JOIN  comunidades c ON co."idComunidad"=c."idComunidad" WHERE "idCuenta" = $1`, [req.params.id]);
		res.status(200).json(listas.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las listas" });
	} 
};

export const getComunidadesDeLista = async (req, res) => {
	const listaId = req.params.id;
	try {
		const [peliculas] = await pool.query(
			`SELECT * FROM listaspeliculas WHERE idLista = ?`,
			[listaId]
		);
		res.status(200).json(peliculas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las películas de la lista" });
	} 
};

export const getComunidade = async (req, res) => {
	const listaId = req.params.id;
	try {
		const [peliculas] = await pool.query(
			`SELECT l.*,c.* FROM comunidades l INNER JOIN cuentas c ON c."idCuenta"=l."idCuenta" WHERE idcomunidad = ?`,
			[listaId]
		);
		res.status(200).json(peliculas);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al obtener las películas de la lista" });
	} 
};

export const crearComunidades = async (req, res) => {
	const { nombreComunidad, descripcion, idCreador,logoComunidad } = req.body;
	console.log(nombreComunidad, descripcion, idCreador,logoComunidad )
	try {
		 await pool.query(`BEGIN`)
		const result = await pool.query(
			`INSERT INTO comunidades ("nombreComunidad", "descripcionCominidad", "idCreador","fotoPoster") VALUES ($1, $2, $3,$4) RETURNING "idComunidad"`,
			[nombreComunidad, descripcion, idCreador,logoComunidad]
		);
		const resultComunidad = await pool.query(
			`INSERT INTO "comunidadesCuentas" ("idComunidad", "idCuenta") VALUES ($1, $2)`,
			[result.rows[0].idComunidad, idCreador]
		);
		await pool.query(`COMMIT`)
		res.status(201).json({ id: result.rows[0].idComunidad, nombreComunidad, descripcion, idCreador });
	} catch (error) {
		console.error(error);
		pool.query(`ROLLBACK`)
		res.status(500).json({ message: "Error al crear la lista" });
	} 
};

export const agregarUsuariosAComunidades = async (req, res) => {
	const { idComunidad, idUsuario } = req.body;
	console.log({ idComunidad, idUsuario })
	try {
		await pool.query(
			`INSERT INTO "comunidadesCuentas" ("idComunidad", "idCuenta") VALUES ($1, $2)`,
			[idComunidad, idUsuario]
		);
		res.status(201).json({ message: "Usuario agregado a comunidad" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al agregar la película a la lista" });
	} 
};

export const eliminarComunidadesDeLista = async (req, res) => {
	const { idLista, idPelicula } = req.body;
	try {
		await pool.query(
			"DELETE FROM listaspeliculas WHERE idLista = ? AND idPelicula = ?",
			[idLista, idPelicula]
		);
		res.status(200).json({ message: "Película eliminada de la lista" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al eliminar la película de la lista" });
	} 
}
