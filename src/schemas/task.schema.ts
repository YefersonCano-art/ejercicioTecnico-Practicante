import { z } from "zod";

export const taskStatusSchema = z.enum(["pendiente", "en curso", "completada"]);

export const taskIdParamSchema = z.object({
  id: z.string().uuid("El id de la tarea debe ser UUID válido"),
});

export const createTaskSchema = z.object({
  titulo: z.string().trim().min(2, "El título debe tener al menos 2 caracteres").max(120),
  descripcion: z.string().trim().min(2, "La descripción debe tener al menos 2 caracteres").max(2000),
  fecha_vencimiento: z.coerce.date({
    error: "fecha_vencimiento debe ser una fecha válida",
  }),
  estado: taskStatusSchema.optional(),
});

export const updateTaskSchema = createTaskSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Debes enviar al menos un campo para actualizar",
  }
);

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
