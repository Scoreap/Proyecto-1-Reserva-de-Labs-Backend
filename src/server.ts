import express from "express";
import cors from "cors";
import { listarSalas, crearSala, crearReserva, borrarSala } from "./salas.controller.js";

const app = express();
app.use(cors());          // deja que el frontend (otro puerto) llame
app.use(express.json());  // para leer req.body

app.get("/api/salas", listarSalas);
app.post("/api/salas", crearSala);
app.post("/api/salas/:id/reservas", crearReserva);
app.delete("/api/salas/:id", borrarSala);

const PORT = Number(process.env.PORT) || 3010;
app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));