import "dotenv/config";

/**
 * Gestor centralizado de variables de entorno.
 * Singleton para acceso consistente en toda la aplicación.
 */
class Environment {
  private static instance: Environment;

  readonly NODE_ENV: string;
  readonly PORT: number;
  readonly DATABASE_URL: string;
  readonly JWT_SECRET: string;
  readonly LOG_LEVEL: string;

  private constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.PORT = parseInt(process.env.PORT || "3000", 10);
    this.DATABASE_URL = this.getRequired("DATABASE_URL");
    this.JWT_SECRET = this.getRequired("JWT_SECRET");
    this.LOG_LEVEL = process.env.LOG_LEVEL || "info";

    this.validate();
  }

  /**
   * Obtiene instancia única del gestor de configuración.
   */
  static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  /**
   * Obtiene variable requerida o lanza error.
   */
  private getRequired(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Variable de entorno requerida no encontrada: ${key}`);
    }
    return value;
  }

  /**
   * Valida configuración crítica.
   */
  private validate(): void {
    if (this.NODE_ENV !== "development" && this.NODE_ENV !== "production") {
      throw new Error(`NODE_ENV inválido. Debe ser 'development' o 'production', recibido: ${this.NODE_ENV}`);
    }

    if (this.PORT < 1 || this.PORT > 65535) {
      throw new Error(`PORT inválido: ${this.PORT}`);
    }

    if (!this.DATABASE_URL.startsWith("postgresql://")) {
      throw new Error("DATABASE_URL debe ser una URL PostgreSQL válida");
    }

    if (this.NODE_ENV === "production" && this.JWT_SECRET === "change-me-in-production") {
      throw new Error("JWT_SECRET no debe ser el valor por defecto en producción");
    }
  }

  /**
   * Indica si está en modo desarrollo.
   */
  isDevelopment(): boolean {
    return this.NODE_ENV === "development";
  }

  /**
   * Indica si está en modo producción.
   */
  isProduction(): boolean {
    return this.NODE_ENV === "production";
  }
}

export const config = Environment.getInstance();
