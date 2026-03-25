import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { AuthenticationError } from "../errors/app-error";

export type JwtPayload = {
  userId: string;
  email: string;
};

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (typeof decoded === "string") {
      throw new AuthenticationError("Token inválido");
    }
    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch {
    throw new AuthenticationError("Token inválido o expirado");
  }
}
