import { Router } from "express";
import { TaskController } from "../../controllers/task.controller";
import { TaskRepository } from "../../persistence/task.repository";
import { TaskService } from "../../services/task.service";
import { asyncHandler } from "../middlewares/async-handler";
import { authMiddleware } from "../middlewares/auth.middleware";

const taskRouter = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRouter.use(authMiddleware);

taskRouter.post("/", asyncHandler(taskController.create));
taskRouter.get("/", asyncHandler(taskController.findAll));
taskRouter.get("/:id", asyncHandler(taskController.findById));
taskRouter.put("/:id", asyncHandler(taskController.update));
taskRouter.delete("/:id", asyncHandler(taskController.delete));

export default taskRouter;
