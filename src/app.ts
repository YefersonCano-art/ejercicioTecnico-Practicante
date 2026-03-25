
import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/env";

const app: Express = express();

/**
 * Middleware de seguridad global
 */
app.use(helmet());
app.use(cors({
  origin: config.isDevelopment() ? "*" : process.env.ALLOWED_ORIGINS?.split(",") || "*",
  credentials: true,
}));

/**
 * Body parser middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Rutas de la aplicación (se registrarán en el futuro)
 */

/**
 * Health check endpoint
 */
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

/**
 * Manejo global de rutas no encontradas
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.path,
    method: req.method,
  });
});

/**
 * Manejo global de errores (middleware)
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error no capturado:", err);

  res.status(500).json({
    error: "Error interno del servidor",
    message: config.isDevelopment() ? err.message : "Intenta más tarde",
  });
});

export default app;

