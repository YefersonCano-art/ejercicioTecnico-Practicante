import type { Task } from "../../persistence/models/task.model";
import type { CreateTaskInput, UpdateTaskInput } from "../../schemas/task.schema";

export interface ITaskService {
  create(userId: string | undefined, input: CreateTaskInput): Promise<Task>;
  findAll(userId: string | undefined): Promise<Task[]>;
  findById(userId: string | undefined, id: string): Promise<Task>;
  update(userId: string | undefined, id: string, input: UpdateTaskInput): Promise<Task>;
  delete(userId: string | undefined, id: string): Promise<void>;
}