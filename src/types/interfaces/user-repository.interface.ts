import type { User } from "../../persistence/models/user.model";

export type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
};

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
}