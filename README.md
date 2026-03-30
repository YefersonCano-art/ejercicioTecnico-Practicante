# Sistema de Gestión de Tareas API

API REST desarrollada con Node.js, Express, TypeScript y PostgreSQL para gestionar autenticación de usuarios y CRUD de tareas con ownership estricto.

## Arquitectura

Estructura por capas implementada:

- `src/api`: rutas y middlewares HTTP.
- `src/controllers`: adaptación request/response.
- `src/services`: lógica de negocio.
- `src/persistence`: modelos y repositorios de base de datos.
- `src/schemas`: validación de entradas con Zod.
- `src/errors`: errores custom y tipados.
- `src/config`: configuración de entorno, conexión DB y Swagger.
- `src/utils`: utilidades transversales (JWT).

## Stack tecnológico

- Node.js + Bun
- Express.js
- TypeScript
- PostgreSQL
- Sequelize + sequelize-typescript
- Zod (validación)
- JWT + bcryptjs (auth)
- Swagger (documentación)

## Despliegue en Render

- URL principal (Swagger UI): [https://ejerciciotecnico-practicante.onrender.com/docs/](https://ejerciciotecnico-practicante.onrender.com/docs/)
- API base: [https://ejerciciotecnico-practicante.onrender.com](https://ejerciciotecnico-practicante.onrender.com)
- Health: [https://ejerciciotecnico-practicante.onrender.com/health](https://ejerciciotecnico-practicante.onrender.com/health)

## Requisitos previos

- Bun instalado.
- Instancia PostgreSQL accesible (Supabase o local).
- Archivo `.env` configurado.

## Instalación

```bash
bun install
```

## Variables de entorno

Usa `.env.example` como base:

```bash
cp .env.example .env
```

Variables principales:

- `DATABASE_URL`: URL de conexión PostgreSQL.
- `JWT_SECRET`: clave secreta para firmar JWT.
- `PORT`: puerto de la API.
- `NODE_ENV`: `development` o `production`.

## Scripts

- `bun run dev`: arranca en modo watch.
- `bun run start`: arranque normal con Bun.
- `bun run type-check`: validación de tipos TypeScript.
- `bun run build`: instala dependencias y ejecuta validación de tipos.

## Ejecución local

```bash
bun run dev
```

Servidor local:

- API: [http://localhost:3000](http://localhost:3000)
- Health: [http://localhost:3000/health](http://localhost:3000/health)
- Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)

## Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Tasks (requiere Bearer token)

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Ownership de tareas

Cada tarea se guarda con `owner_id` y todas las operaciones de lectura/edición/eliminación filtran por `req.user.id` extraído del JWT. Un usuario no puede operar tareas de otro usuario.

## Validación y errores

- Validación de payloads con Zod en Auth y Tasks.
- Manejo centralizado de errores mediante `AppError`.
- Respuesta de error consistente:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Error de validación",
  "details": {
    "email": ["Email inválido"]
  }
}
```

## Swagger

La documentación OpenAPI está disponible en `/docs` y se genera con `swagger-jsdoc` a partir de anotaciones JSDoc en rutas.

- Local: [http://localhost:3000/docs](http://localhost:3000/docs)
- Producción (Render): [https://ejerciciotecnico-practicante.onrender.com/docs/](https://ejerciciotecnico-practicante.onrender.com/docs/)

## Estado por fases

- Fase A: completada.
- Fase B: completada.
- Fase C: completada.
- Fase D: completada.
- Fase E: completada.
