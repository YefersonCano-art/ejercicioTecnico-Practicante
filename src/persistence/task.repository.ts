import { Task } from "./models/task.model";

export class TaskRepository {
  async create(data: {
    ownerId: string;
    titulo: string;
    descripcion: string;
    fechaVencimiento: Date;
    estado?: "pendiente" | "en curso" | "completada";
  }): Promise<Task> {
    return Task.create(data);
  }

  async findAllByOwner(ownerId: string): Promise<Task[]> {
    return Task.findAll({
      where: { ownerId },
      order: [["createdAt", "DESC"]],
    });
  }

  async findByIdAndOwner(id: string, ownerId: string): Promise<Task | null> {
    return Task.findOne({ where: { id, ownerId } });
  }

  async updateByIdAndOwner(
    id: string,
    ownerId: string,
    updates: Partial<{
      titulo: string;
      descripcion: string;
      fechaVencimiento: Date;
      estado: "pendiente" | "en curso" | "completada";
    }>
  ): Promise<Task | null> {
    const task = await this.findByIdAndOwner(id, ownerId);
    if (!task) {
      return null;
    }

    await task.update(updates);
    return task;
  }

  async deleteByIdAndOwner(id: string, ownerId: string): Promise<boolean> {
    const deletedRows = await Task.destroy({ where: { id, ownerId } });
    return deletedRows > 0;
  }
}
