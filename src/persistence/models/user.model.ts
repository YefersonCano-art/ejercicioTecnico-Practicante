import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import type { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { Task } from "./task.model";

@Table({
  tableName: "users",
  timestamps: true,
  underscored: true,
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100],
    },
  })
  declare name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [5, 150],
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "password_hash",
  })
  declare passwordHash: string;

  @HasMany(() => Task)
  declare tasks: NonAttribute<Task[]>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
