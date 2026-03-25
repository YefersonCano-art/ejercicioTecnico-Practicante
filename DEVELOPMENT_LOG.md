# DEVELOPMENT_LOG

## 0) Setup inicial del ejercicio técnico

### Contexto

Este proyecto corresponde a la prueba técnica backend (Node.js + Express + TypeScript + PostgreSQL) para perfil de practicante.

### Enfoque de trabajo

- Se trabajó por fases A→E usando SDD.
- Se usó la skill `backend-technical-interview-assistant` como copiloto técnico.
- La IA se utilizó para acelerar, pero las decisiones finales, ajustes y validaciones fueron propias.

### Convención de este documento

Este log se enfoca en:

1. decisiones técnicas,
2. qué se aceptó/rechazó de IA,
3. evidencia de cierre por fase.

La verificación operativa detallada está en `README.md` y será explicada en el video de entrega.

---

## Fase A — Setup y arquitectura

### Objetivo

Dejar el proyecto base ejecutable con estructura por capas, configuración centralizada y conexión PostgreSQL por Sequelize.

### Implementado

- Estructura por capas: `api`, `controllers`, `services`, `persistence`, `schemas`, `errors`, `config`, `utils`.
- Configuración centralizada en `src/config/env.ts`.
- Conexión ORM en `src/config/database.ts`.
- Archivos `.env` y `.env.example`.
- Bootstrap del servidor en `src/index.ts`.

### Decisiones propias

- Uso de patrón singleton para variables de entorno.
- Validación fail-fast de variables críticas.
- Habilitación de SSL para Supabase.

### Uso de IA

**Prompt:**

> "Inicializar Sequelize (sequelize-typescript) y conexión PostgreSQL, preparar .env y .env.example, montar config centralizada."

**Aceptado:** estructura base, configuración y conexión ORM.

**Rechazado/modificado:** se endurecieron validaciones de entorno y consistencia de configuración.

### Estado

✅ Fase A cerrada.

---

## Fase B — Auth

### Objetivo

Implementar registro/login con JWT y middleware Bearer.

### Implementado

- Modelo `User` con `sequelize-typescript`.
- `POST /auth/register` y `POST /auth/login`.
- Hash de contraseña con `bcryptjs`.
- Firma y verificación JWT.
- Middleware de autenticación (`auth.middleware.ts`).

### Decisiones propias

- `bcryptjs` para evitar fricción de binarios nativos.
- `register` retorna token para simplificar flujo de cliente/pruebas.
- `ConflictError (409)` para email duplicado.

### Uso de IA

**Prompt:**

> "Usando la skill backend-technical-interview-assistant iniciemos la etapa de Auth y usa doc_spec para leer esta fase."

**Aceptado:** arquitectura completa por capas de Auth.

**Rechazado/modificado:** ajustes de tipado en Sequelize (`CreationOptional`, imports de tipos) y limpieza de imports no usados.

### Estado

✅ Fase B cerrada.

---

## Fase C — Tasks CRUD con ownership

### Objetivo

Implementar CRUD de tareas con ownership estricto por usuario autenticado.

### Implementado

- Modelo `Task` + relaciones con `User`.
- Endpoints:
  - `POST /tasks`
  - `GET /tasks`
  - `GET /tasks/:id`
  - `PUT /tasks/:id`
  - `DELETE /tasks/:id`
- Filtro por `req.user.id` en capa service/repository.
- Validación Zod para body y params en tasks.

### Decisiones propias

- Uso de `404` para acceso a recurso ajeno (evitar filtración de existencia).
- Ownership aplicado en doble capa (service + repository).
- `req.user.id` como única fuente de verdad de ownership.

### Uso de IA

**Prompt:**

> "Usando la skill backend-technical-interview-assistant pasa a Fase C e implementa Task model + CRUD con ownership estricto sobre req.user.id; usa doc_spec para esta fase."

**Aceptado:** estructura completa de Tasks por capas.

**Rechazado/modificado:** ajuste de asociaciones tipadas con `NonAttribute` para resolver errores de creación en Sequelize.

### Estado

✅ Fase C cerrada.

---

## Fase D — Validación y errores

### Objetivo

Unificar validación de entradas y manejo de errores en toda la API.

### Implementado

- Zod aplicado en Auth y Tasks.
- Error handler central en `src/api/middlewares/error.middleware.ts`.
- Errores custom en `src/errors/app-error.ts`.
- Códigos HTTP coherentes (`400`, `401`, `404`, `409`, `500`).

### Decisiones propias

- `ValidationError` con `details` para mapear field errors.
- Middleware de errores único para uniformidad.

### Uso de IA

**Prompt:**

> "Usando la skill backend-technical-interview-assistant pasa a Fase D para revisarlo; si todo está bien no realices cambios."

**Aceptado:** auditoría contra DoD sin cambios innecesarios.

**Rechazado/modificado:** no se aplicaron cambios al estar la fase cumplida.

### Estado

✅ Fase D cerrada.

---

## Fase E — Documentación y cierre

### Objetivo

Completar entregables documentales para evaluación final.

### Implementado

- README completo.
- Swagger integrado (`/docs`) y documentado en rutas.
- JSDoc clave en servicios y middleware.
- Cierre de bitácora por fases.

### Decisiones propias

- Swagger por anotaciones en rutas para mantener trazabilidad código-doc.
- Priorización de JSDoc en capas de lógica crítica.

### Uso de IA

**Prompt:**

> "Usando la skill backend-technical-interview-assistant pasa a Fase E: README completo, documentar Swagger, agregar JSDoc clave y completar DEVELOPMENT_LOG."

**Aceptado:** checklist de entregables de documentación.

**Rechazado/modificado:** se evitó agregar artefactos no solicitados por la rúbrica.

### Estado

✅ Fase E cerrada.

---

## Retos y soluciones (resumen)

- Tipado estricto con Sequelize + TypeScript: resuelto con `CreationOptional` y `NonAttribute`.
- Ownership seguro en CRUD: resuelto con filtro por `req.user.id` en toda operación sensible.
- Consistencia de errores: resuelta con middleware central y jerarquía de errores custom.

---

## Cierre

El proyecto queda trazable por fases, con decisiones justificadas y evidencia de uso crítico de IA alineada a la rúbrica de la prueba técnica.
