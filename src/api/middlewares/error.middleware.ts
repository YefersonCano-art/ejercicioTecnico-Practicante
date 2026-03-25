import type { NextFunction, Request, Response } from "express";
import { config } from "../../config/env";
import { AppError, ValidationError } from "../../errors/app-error";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.code ?? "APP_ERROR",
      message: err.message,
      ...(err instanceof ValidationError ? { details: err.details } : {}),
    });
    return;
  }

  res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: config.isDevelopment() ? err.message : "Error interno del servidor",
  });
}
