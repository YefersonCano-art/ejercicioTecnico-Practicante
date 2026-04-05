import type { Task } from "../../persistence/models/task.model";

export type TaskStatus = "pendiente" | "en curso" | "completada";

export type CreateTaskData = {
  ownerId: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estado?: TaskStatus;
};

export type UpdateTaskData = Partial<{
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estado: TaskStatus;
}>;

export interface ITaskRepository {
  create(data: CreateTaskData): Promise<Task>;
  findAllByOwner(ownerId: string): Promise<Task[]>;
  findByIdAndOwner(id: string, ownerId: string): Promise<Task | null>;
  updateByIdAndOwner(id: string, ownerId: string, updates: UpdateTaskData): Promise<Task | null>;
  deleteByIdAndOwner(id: string, ownerId: string): Promise<boolean>;
}