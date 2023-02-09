# Installation

---

## Table of Contents

- [Comfortable development](#comfortable-development)
- [Quick run](#quick-run)
- [Links](#links)

---

## Comfortable development

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/axnguyenit/nodejs-rest-api-boilerplate.git my-app
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd my-app/
   cp env-example .env
   ```

1. Add `DATABASE_HOST=YOUR_MONGODB_URL`
   Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

1. Run additional container:

   ```bash
   docker compose up -d mongodb adminer maildev redis
   ```

1. Install dependency

   ```bash
   yarn
   ```

1. Run generations

   ```bash
   yarn prisma:generate
   ```

1. Run push database

   ```bash
   yarn prisma:push
   ```

1. Run seeds

   ```bash
   yarn prisma:seed
   ```

1. Run app in dev mode

   ```bash
   yarn dev
   ```

1. Open http://localhost:8000

---

## Quick run

If you want quick run your app, you can use following commands:

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/axnguyenit/nodejs-rest-api-boilerplate.git my-app
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd my-app/
   cp env-example .env
   ```

1. Run containers

   ```bash
   docker compose up -d
   ```

1. For check status run

   ```bash
   docker compose logs
   ```

1. Open http://localhost:8000

---

## Links

- Swagger (API docs): http://localhost:8000/v1/docs
<!-- - Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080 -->

---

Next: [Working with database](database.md)

GitHub: https://github.com/axnguyenit/nodejs-rest-api-boilerplate
