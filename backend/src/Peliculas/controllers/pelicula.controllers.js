import { pool } from "../../db.js";
import axios from 'axios';
axios.defaults.withCredentials = true;
export const getPeliculas= async(req,res) =>{
    try {
        const data = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=a96c294e02f5de8a45192c80ca9bda2f&language=es-MX&page=1")
        res.status(201).json(data.data)
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}
export const getPelicula= async(req,res) =>{
    const id = req.params.id;
    try {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a96c294e02f5de8a45192c80ca9bda2f&language=es-MX`)
        res.status(201).json(data.data)
    } catch (error) {
        console.log(error)
        res.json({
            message:"error"
        })
    }
}


