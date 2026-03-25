import type { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../../errors/app-error";
import { verifyAccessToken } from "../../utils/jwt";

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("Token de autorización requerido");
  }

  const token = authHeader.slice(7);
  const payload = verifyAccessToken(token);

  req.user = {
    id: payload.userId,
    email: payload.email,
  };

  next();
}
