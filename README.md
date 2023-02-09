# NodeJS REST API boilerplate

## Description

NodeJS REST API boilerplate for typical project

[Full documentation here](https://github.com/axnguyenit/nodejs-rest-api-boilerplate/blob/nodejs-mongodb/docs/index.md)

## Table of Contents

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)
- [Tests](#tests)

## Features

- [x] Database ([prisma](https://www.npmjs.com/package/prisma)).
- [x] Seeding.
- [x] Config Service.
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Quick run

```bash
git clone --depth 1 https://github.com/axnguyenit/nodejs-rest-api-boilerplate.git my-app
cd my-app/
cp env-example .env
docker compose up -d
```

For check status run

```bash
docker compose logs
```

## Comfortable development

```bash
git clone --depth 1 https://github.com/axnguyenit/nodejs-rest-api-boilerplate.git my-app
cd my-app/
cp env-example .env
```

Add `DATABASE_HOST=YOUR_MONGODB_URL`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker compose up -d mongodb adminer maildev redis
```

```bash
yarn

yarn prisma:generate

yarn prisma:push

yarn dev
```

## Links

- Swagger (API docs): http://localhost:8000/v1/docs
<!-- - Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080 -->

## Automatic update of dependencies

If you want to automatically update dependencies, you can connect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Run generate

```bash
yarn prisma:generate
```

Run push collections

```bash
yarn prisma:push
```

Run seed

```bash
yarn prisma:seed
```

## Tests

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e
```

## Tests in Docker

```bash
docker compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```
