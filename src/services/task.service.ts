import { AuthenticationError, NotFoundError } from "../errors/app-error";
import { TaskRepository } from "../persistence/task.repository";
import type { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(userId: string | undefined, input: CreateTaskInput) {
    this.ensureAuthenticated(userId);

    return this.taskRepository.create({
      ownerId: userId,
      titulo: input.titulo,
      descripcion: input.descripcion,
      fechaVencimiento: input.fecha_vencimiento,
      estado: input.estado,
    });
  }

  async findAll(userId: string | undefined) {
    this.ensureAuthenticated(userId);
    return this.taskRepository.findAllByOwner(userId);
  }

  async findById(userId: string | undefined, id: string) {
    this.ensureAuthenticated(userId);

    const task = await this.taskRepository.findByIdAndOwner(id, userId);
    if (!task) {
      throw new NotFoundError("Tarea");
    }

    return task;
  }

  async update(userId: string | undefined, id: string, input: UpdateTaskInput) {
    this.ensureAuthenticated(userId);

    const task = await this.taskRepository.updateByIdAndOwner(id, userId, {
      ...(input.titulo !== undefined ? { titulo: input.titulo } : {}),
      ...(input.descripcion !== undefined ? { descripcion: input.descripcion } : {}),
      ...(input.fecha_vencimiento !== undefined ? { fechaVencimiento: input.fecha_vencimiento } : {}),
      ...(input.estado !== undefined ? { estado: input.estado } : {}),
    });

    if (!task) {
      throw new NotFoundError("Tarea");
    }

    return task;
  }

  async delete(userId: string | undefined, id: string) {
    this.ensureAuthenticated(userId);

    const deleted = await this.taskRepository.deleteByIdAndOwner(id, userId);
    if (!deleted) {
      throw new NotFoundError("Tarea");
    }
  }

  private ensureAuthenticated(userId: string | undefined): asserts userId is string {
    if (!userId) {
      throw new AuthenticationError("No autorizado");
    }
  }
}
