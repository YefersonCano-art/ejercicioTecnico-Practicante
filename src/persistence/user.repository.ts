import { UniqueConstraintError } from "sequelize";
import { ConflictError } from "../errors/app-error";
import { User } from "./models/user.model";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<User> {
    try {
      return await User.create(data);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("El email ya está registrado");
      }
      throw error;
    }
  }
}
