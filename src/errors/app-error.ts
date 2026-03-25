/**
 * Clase base para errores de aplicación.
 * Todos los errores custom deben extender esta clase.
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Error de autenticación.
 */
export class AuthenticationError extends AppError {
  constructor(message: string = "No autorizado") {
    super(401, message, "AUTHENTICATION_ERROR");
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Error de autorización.
 */
export class ForbiddenError extends AppError {
  constructor(message: string = "Acceso denegado") {
    super(403, message, "FORBIDDEN_ERROR");
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * Error de recurso no encontrado.
 */
export class NotFoundError extends AppError {
  constructor(resource: string = "Recurso") {
    super(404, `${resource} no encontrado`, "NOT_FOUND_ERROR");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Error de validación.
 */
export class ValidationError extends AppError {
  constructor(
    public details: Record<string, string[]> = {}
  ) {
    super(400, "Error de validación", "VALIDATION_ERROR");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error de conflicto (ej: email duplicado).
 */
export class ConflictError extends AppError {
  constructor(message: string = "Conflicto en los datos") {
    super(409, message, "CONFLICT_ERROR");
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * Error de servidor interno.
 */
export class InternalServerError extends AppError {
  constructor(message: string = "Error interno del servidor") {
    super(500, message, "INTERNAL_SERVER_ERROR");
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
