import { AuthenticationError, NotFoundError } from "../errors/app-error";
import { TaskRepository } from "../persistence/task.repository";
import type { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema";

/**
 * Servicio de negocio para CRUD de tareas con ownership estricto por usuario.
 */
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  /**
   * Crea una tarea asociada al usuario autenticado.
   */
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

  /**
   * Lista todas las tareas del usuario autenticado.
   */
  async findAll(userId: string | undefined) {
    this.ensureAuthenticated(userId);
    return this.taskRepository.findAllByOwner(userId);
  }

  /**
   * Obtiene una tarea por id solo si pertenece al usuario autenticado.
   */
  async findById(userId: string | undefined, id: string) {
    this.ensureAuthenticated(userId);

    const task = await this.taskRepository.findByIdAndOwner(id, userId);
    if (!task) {
      throw new NotFoundError("Tarea");
    }

    return task;
  }

  /**
   * Actualiza una tarea por id solo si pertenece al usuario autenticado.
   */
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

  /**
   * Elimina una tarea por id solo si pertenece al usuario autenticado.
   */
  async delete(userId: string | undefined, id: string) {
    this.ensureAuthenticated(userId);

    const deleted = await this.taskRepository.deleteByIdAndOwner(id, userId);
    if (!deleted) {
      throw new NotFoundError("Tarea");
    }
  }

  /**
   * Garantiza que exista un usuario autenticado antes de operar.
   */
  private ensureAuthenticated(userId: string | undefined): asserts userId is string {
    if (!userId) {
      throw new AuthenticationError("No autorizado");
    }
  }
}
