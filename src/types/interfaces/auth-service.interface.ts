import type { LoginInput, RegisterInput } from "../../schemas/auth.schema";
import type { AuthResponse } from "../auth.types";

export interface IAuthService {
  register(input: RegisterInput): Promise<AuthResponse>;
  login(input: LoginInput): Promise<AuthResponse>;
}