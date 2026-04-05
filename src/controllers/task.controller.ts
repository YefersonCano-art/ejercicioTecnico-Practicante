import type { Request, Response } from "express";
import { ValidationError } from "../errors/app-error";
import {
  createTaskSchema,
  taskIdParamSchema,
  updateTaskSchema,
} from "../schemas/task.schema";
import type { ITaskService } from "../types/interfaces/task-service.interface";

export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const parsedBody = createTaskSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ValidationError(parsedBody.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const task = await this.taskService.create(req.user?.id, parsedBody.data);
    res.status(201).json(task);
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    const tasks = await this.taskService.findAll(req.user?.id);
    res.status(200).json(tasks);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const parsedParams = taskIdParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ValidationError(parsedParams.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const task = await this.taskService.findById(req.user?.id, parsedParams.data.id);
    res.status(200).json(task);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const parsedParams = taskIdParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ValidationError(parsedParams.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const parsedBody = updateTaskSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ValidationError(parsedBody.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const updatedTask = await this.taskService.update(req.user?.id, parsedParams.data.id, parsedBody.data);
    res.status(200).json(updatedTask);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const parsedParams = taskIdParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ValidationError(parsedParams.error.flatten().fieldErrors as Record<string, string[]>);
    }

    await this.taskService.delete(req.user?.id, parsedParams.data.id);
    res.status(204).send();
  };
}
