# SDD por Fases — Prueba Técnica Backend

## 1) Propósito

Definir una especificación ejecutable y verificable para construir el proyecto **Sistema de Gestión de Tareas** con:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Sequelize + sequelize-typescript (ORM)

---

## 2) Alcance fijo del proyecto

### Incluye

- Auth:
  - `POST /auth/register`
  - `POST /auth/login`
  - middleware Bearer JWT
- Tasks CRUD con ownership:
  - `POST /tasks`
  - `GET /tasks`
  - `GET /tasks/:id`
  - `PUT /tasks/:id`
  - `DELETE /tasks/:id`
- Validación con Zod
- Manejo centralizado de errores
- Documentación final: README, Swagger, JSDoc y DEVELOPMENT_LOG

### No incluye por defecto

- Roles avanzados
- UI frontend
- Filtros avanzados no solicitados
- Despliegue cloud (deseable, no obligatorio)

---

## 3) Stack y principios no negociables

- Node.js + Express + TypeScript
- PostgreSQL
- Sequelize + sequelize-typescript
- Zod para validación
- JWT + bcryptjs para autenticación
- Arquitectura por capas (`api`, `controllers`, `services`, `persistence`)

Principios:

1. Cumplir el enunciado primero.
2. Ownership estricto en recursos de tareas.
3. Validación y errores consistentes.
4. Evidencia verificable por fase.

---

## 4) Plan por fases

## Fase A — Setup y arquitectura

### Objetivo

Dejar base técnica ejecutable con configuración centralizada y conexión ORM lista.

### Implementación esperada

- Estructura por capas creada.
- `.env` y `.env.example` definidos.
- Configuración centralizada (patrón singleton o equivalente).
- Conexión Sequelize a PostgreSQL.

### Definition of Done (DoD)

- proyecto inicia en desarrollo,
- conexión DB validada,
- estructura clara y mantenible,
- configuración coherente.

### Evidencia mínima

- arranque exitoso,
- compilación TypeScript,
- archivos de configuración presentes.

---

## Fase B — Auth

### Objetivo

Implementar autenticación funcional y segura para registro/inicio de sesión.

### Implementación esperada

- `POST /auth/register` con hash de contraseña.
- `POST /auth/login` con emisión de JWT.
- middleware `Authorization: Bearer <token>`.
- modelo `User` en Sequelize.

### DoD

- register/login funcionales,
- contraseña no se guarda en texto plano,
- JWT válido y verificable,
- rutas protegibles por middleware.

### Evidencia mínima

- pruebas manuales register/login,
- error por credenciales inválidas (`401`),
- error por validación (`400`).

---

## Fase C — Tasks CRUD con ownership

### Objetivo

Gestionar tareas asegurando aislamiento total por usuario autenticado.

### Implementación esperada

- modelo `Task` con `owner_id`.
- relación `User hasMany Task` / `Task belongsTo User`.
- 5 endpoints CRUD de tareas.
- ownership aplicado en lectura, actualización y eliminación.

### DoD

- CRUD completo funcionando,
- usuario solo accede a sus propias tareas,
- estado de tarea validado,
- acceso cruzado denegado.

### Evidencia mínima

- usuario A crea tarea,
- usuario B no puede acceder/editar/eliminar esa tarea,
- `GET /tasks` devuelve solo tareas del usuario autenticado.

---

## Fase D — Validación y manejo de errores

### Objetivo

Unificar calidad técnica de entrada/salida en toda la API.

### Implementación esperada

- schemas Zod para Auth y Tasks.
- validación de `body` y `params` donde aplique.
- clases de error custom (`ValidationError`, `AuthenticationError`, `NotFoundError`, `ConflictError`).
- middleware central de errores con JSON consistente.

### DoD

- validación aplicada de forma consistente,
- handler de errores único,
- códigos HTTP coherentes (`400`, `401`, `404`, `409`, `500`),
- sin exposición de datos sensibles.

### Evidencia mínima

- request inválida -> `400` con `details`,
- token inválido -> `401`,
- recurso inexistente/no permitido -> `404`.

---

## Fase E — Documentación y cierre

### Objetivo

Completar entregables de documentación para evaluación técnica final.

### Implementación esperada

- README completo con arquitectura, setup, env, scripts y endpoints.
- Swagger disponible y navegable.
- JSDoc en piezas clave de negocio/middleware.
- DEVELOPMENT_LOG actualizado por fases con uso crítico de IA.

### DoD

- Swagger operativo,
- README usable por tercero,
- DEVELOPMENT_LOG con trazabilidad de decisiones,
- checklist de rúbrica sin `FALTA`.

### Evidencia mínima

- endpoint/documentación Swagger visible,
- secciones completas en README,
- bitácora con prompts, aceptación/rechazo y verificación.

---

## 5) Contratos API resumidos (referencia)

## Auth

### `POST /auth/register`

- Entrada: `name`, `email`, `password`
- Salida: usuario + token
- Errores: `400`, `409`

### `POST /auth/login`

- Entrada: `email`, `password`
- Salida: token + usuario básico
- Errores: `400`, `401`

## Tasks

### `POST /tasks`

- Crea tarea para `req.user.id`

### `GET /tasks`

- Lista tareas del usuario autenticado

### `GET /tasks/:id`

- Devuelve tarea solo si pertenece al usuario

### `PUT /tasks/:id`

- Actualiza tarea solo si pertenece al usuario

### `DELETE /tasks/:id`

- Elimina tarea solo si pertenece al usuario

Errores comunes: `401`, `404`, `400`.

---

## 6) Verificación transversal final

## Pruebas manuales mínimas

Auth:

- registro correcto,
- registro duplicado,
- login correcto,
- login inválido.

Tasks:

- crear tarea,
- listar solo propias,
- consultar por id propia,
- denegar acceso a tarea ajena,
- editar/eliminar propia,
- validar estado inválido.

## Validación técnica

- `bun run build` sin errores.
- API levanta en desarrollo.
- documentación accesible en `/docs`.

---

## 7) Mapeo a rúbrica (OK/PARCIAL/FALTA)

1. Cumplimiento funcional y arquitectura.
2. Calidad de código y patrones.
3. Claridad de documentación.
4. Uso adecuado de Git.
5. Bitácora de desarrollo.
6. Uso crítico de IA.

---

## 8) Entregables esperados al cierre

- Código fuente funcional.
- `README.md`.
- `DEVELOPMENT_LOG.md`.
- Swagger operativo.
- Historial de commits convencionales.
