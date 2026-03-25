import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { ValidationError } from "../errors/app-error";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      const formatted = parsed.error.flatten().fieldErrors;
      throw new ValidationError(formatted as Record<string, string[]>);
    }

    const result = await this.authService.register(parsed.data);
    res.status(201).json(result);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      const formatted = parsed.error.flatten().fieldErrors;
      throw new ValidationError(formatted as Record<string, string[]>);
    }

    const result = await this.authService.login(parsed.data);
    res.status(200).json(result);
  };
}
