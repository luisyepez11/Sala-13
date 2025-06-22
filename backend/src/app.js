import express, { json } from "express"
import cors from "cors"

const app = express()

// Middleware
app.use(cors());
app.use(json());

export default app;