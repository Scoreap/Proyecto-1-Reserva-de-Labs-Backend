import type { Request, Response } from "express";
import { prisma } from "./prisma.js";

// GET /api/salas — trae cada sala con sus reservas
export async function listarSalas(_req: Request, res: Response) {
  const salas = await prisma.sala.findMany({
    include: { reservas: true }, orderBy: { id: "asc" }, take: 100,
  });
  res.json(salas);
}

// POST /api/salas
export async function crearSala(req: Request, res: Response) {
  const { nombre, edificio, capacidad } = req.body;
  const sala = await prisma.sala.create({ data: { nombre, edificio, capacidad } });
  res.status(201).json(sala);
}

// POST /api/salas/:id/reservas
export async function crearReserva(req: Request, res: Response) {
  const salaId = Number(req.params.id);
  const { responsable, motivo, inicio, fin } = req.body;
  const reserva = await prisma.reserva.create({
    data: { responsable, motivo, inicio: new Date(inicio), fin: new Date(fin), salaId },
  });
  res.status(201).json(reserva);
}

// DELETE /api/salas/:id
export async function borrarSala(req: Request, res: Response) {
  const id = Number(req.params.id);
  try { await prisma.sala.delete({ where: { id } }); res.status(204).end(); }
  catch { res.status(404).json({ error: "sala no encontrada" }); }
}