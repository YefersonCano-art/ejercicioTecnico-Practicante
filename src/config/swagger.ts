import swaggerJSDoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API REST para autenticación y gestión de tareas con ownership por usuario.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", format: "email", example: "jane@example.com" },
            password: { type: "string", minLength: 8, example: "Password123" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "jane@example.com" },
            password: { type: "string", example: "Password123" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                name: { type: "string" },
                email: { type: "string", format: "email" },
              },
            },
          },
        },
        TaskRequest: {
          type: "object",
          required: ["titulo", "descripcion", "fecha_vencimiento"],
          properties: {
            titulo: { type: "string", example: "Preparar entrega" },
            descripcion: { type: "string", example: "Completar documentación de fase E" },
            fecha_vencimiento: { type: "string", format: "date", example: "2026-12-31" },
            estado: {
              type: "string",
              enum: ["pendiente", "en curso", "completada"],
              example: "pendiente",
            },
          },
        },
        TaskResponse: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            ownerId: { type: "string", format: "uuid" },
            titulo: { type: "string" },
            descripcion: { type: "string" },
            fechaVencimiento: { type: "string", format: "date-time" },
            estado: { type: "string", enum: ["pendiente", "en curso", "completada"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "VALIDATION_ERROR" },
            message: { type: "string", example: "Error de validación" },
            details: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  apis: ["src/api/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
