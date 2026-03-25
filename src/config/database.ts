import { Sequelize } from "sequelize-typescript";
import { config } from "./env";

/**
 * Instancia única de Sequelize para toda la aplicación.
 * Parsea DATABASE_URL de PostgreSQL y configurar logging según NODE_ENV.
 */
const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: "postgres",
  logging: config.isDevelopment() ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // Validación de SSL para conexiones remotas (Supabase requiere SSL)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

/**
 * Registra modelos dinámicamente.
 * Los modelos deben estar en src/persistence/models/ con sufijo .model.ts
 */
sequelize.addModels([
  // Los modelos se registrarán aquí cuando se creen
  // Ejemplo: User, Task, etc.
]);

export default sequelize;
