
import "reflect-metadata";
import app from "./app";
import sequelize from "./config/database";
import { config } from "./config/env";

const PORT = config.PORT;

/**
 * Inicializa la aplicación: sincroniza BD y levanta servidor
 */
async function bootstrap() {
  try {
    // Conecta e inicializa Sequelize
    await sequelize.authenticate();
    console.log("✓ Conexión a PostgreSQL establecida");

    // Sincroniza modelos con la BD (crea tablas si no existen)
    // En producción, usa migraciones en lugar de sync
    if (config.isDevelopment()) {
      await sequelize.sync({ alter: config.isDevelopment() });
      console.log("✓ Base de datos sincronizada");
    }

    // Levanta el servidor Express
    app.listen(PORT, () => {
      console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
      console.log(`✓ Ambiente: ${config.NODE_ENV}`);
    });
  } catch (error) {
    console.error("✗ Error al inicializar:", error);
    process.exit(1);
  }
}

bootstrap();

