import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import type { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { User } from "./user.model";

export const TASK_STATUS = ["pendiente", "en curso", "completada"] as const;

@Table({
  tableName: "tasks",
  timestamps: true,
  underscored: true,
})
export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "owner_id",
  })
  declare ownerId: string;

  @BelongsTo(() => User)
  declare owner: NonAttribute<User>;

  @Column({
    type: DataType.STRING(120),
    allowNull: false,
    validate: {
      len: [2, 120],
    },
  })
  declare titulo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      len: [2, 2000],
    },
  })
  declare descripcion: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "fecha_vencimiento",
  })
  declare fechaVencimiento: Date;

  @Column({
    type: DataType.ENUM(...TASK_STATUS),
    allowNull: false,
    defaultValue: "pendiente",
  })
  declare estado: CreationOptional<(typeof TASK_STATUS)[number]>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
