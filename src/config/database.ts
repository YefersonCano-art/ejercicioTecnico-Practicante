import { Sequelize } from "sequelize-typescript";
import { config } from "./env";

//Parsea DATABASE_URL de PostgreSQL y configurar logging según NODE_ENV.
 
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


sequelize.addModels([
  // Los modelos se registrarán aquí cuando se creen
]);

export default sequelize;
