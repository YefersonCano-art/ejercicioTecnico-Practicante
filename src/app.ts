
import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/env";
import authRouter from "./api/routes/auth.routes";
import taskRouter from "./api/routes/task.routes";
import { errorMiddleware } from "./api/middlewares/error.middleware";
import { swaggerSpec } from "./config/swagger";

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
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.use(errorMiddleware);

export default app;

