import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

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

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
