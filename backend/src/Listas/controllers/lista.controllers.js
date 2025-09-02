import { pool } from "../../db.js";

export const getListas = async (req, res) => {
    try {
        const [listas] = await pool.query("SELECT * FROM listas");
        res.status(200).json(listas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las listas" });
    }
};

export const getListasUsuarios = async (req, res) => {
    try {
        const [listas] = await pool.query("SELECT * FROM listas WHERE idCuenta = ?", [req.params.id]);
        res.status(200).json(listas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las listas" });
    }
};



export const getPeliculasDeLista = async (req, res) => {
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

export const crearLista = async (req, res) => {
    const { nombreLista, descripcion, idCuenta } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO listas (nombreLista, descripcion, idCuenta) VALUES (?, ?, ?)",
            [nombreLista, descripcion, idCuenta]
        );
        res.status(201).json({ id: result.insertId, nombreLista, descripcion, idCuenta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la lista" });
    }
};

export const agregarPeliculaALista = async (req, res) => {
    const { idLista, idPelicula } = req.body;
    console.log(idPelicula)
    try {
        await pool.query(
            "INSERT INTO listaspeliculas (idLista, idPelicula) VALUES (?, ?)",
            [idLista, idPelicula]
        );
        res.status(201).json({ message: "Película agregada a la lista" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar la película a la lista" });
    }
};

export const eliminarPeliculaDeLista = async (req, res) => {
    const { idLista, idPelicula } = req.body;
    console.log(req.body)
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