import { pool } from "../../db.js";
import axios from 'axios';
axios.defaults.withCredentials = true;
export const getPeliculas = async (req, res) => {
    try {
        const data = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=a96c294e02f5de8a45192c80ca9bda2f&language=es-MX&page=1")
        res.status(201).json(data.data)
    } catch (error) {
        console.log(error)
        res.json({
            message: "error"
        })
    }
}
export const getPeliculasGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=a96c294e02f5de8a45192c80ca9bda2f&language&with_genres=${id}")
        res.status(201).json(data.data)
    } catch (error) {
        console.log(error)
        res.json({
            message: "error"
        })
    }
}
export const getBusquedaPeliculas = async (req, res) => {
    const query = req.params.id;
    try {
        let allResults = [];
        let currentPage = 1;
        let totalPages = 1;
        while (currentPage <= totalPages) {
            const params = {
                api_key: "a96c294e02f5de8a45192c80ca9bda2f",
                language: "es-MX",
                query: query,
                page: currentPage
            };
            const response = await axios.get("https://api.themoviedb.org/3/search/movie", { params });
            allResults = [...allResults, ...response.data.results];
            if (currentPage === 1) {
                totalPages = response.data.total_pages;
            }
            currentPage++;
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        const combinedResponse = {
            page: 1,
            results: allResults,
            total_pages: totalPages,
            total_results: allResults.length
        };
        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error("Error en getBusquedaPeliculas:", error);
        if (error.response) {
            res.status(error.response.status).json({
                message: "Error de TMDB: ${error.response.data.status_message}",
                code: error.response.status
            });
        } else {
            res.status(500).json({
                message: "Error interno del servidor"
            });
        }
    }
};
export const getPelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await axios.get("https://api.themoviedb.org/3/movie/${id}?api_key=a96c294e02f5de8a45192c80ca9bda2f&language=es-MX")
        res.status(201).json(data.data)
    } catch (error) {
        console.log(error)
        res.json({
            message: "error"
        })
    }
}
