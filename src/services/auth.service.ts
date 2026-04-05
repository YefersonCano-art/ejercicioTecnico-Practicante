import bcrypt from "bcryptjs";
import { AuthenticationError, ConflictError } from "../errors/app-error";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";
import type { IUserRepository } from "../types/interfaces/user-repository.interface";
import type { IAuthService } from "../types/interfaces/auth-service.interface";
import type { AuthResponse } from "../types/auth.types";
import { signAccessToken } from "../utils/jwt";

/**
 * Servicio de autenticación para registro e inicio de sesión.
 */
export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Registra un usuario nuevo, hashea su contraseña y retorna token JWT.
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictError("El email ya está registrado");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    const token = signAccessToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  /**
   * Valida credenciales de usuario y retorna token JWT de acceso.
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new AuthenticationError("Credenciales inválidas");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AuthenticationError("Credenciales inválidas");
    }

    const token = signAccessToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
