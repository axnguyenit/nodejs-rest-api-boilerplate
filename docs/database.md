# Work with database

In NodeJS Boilerplate uses [Prisma](https://www.npmjs.com/package/prisma) and [MongoDB](https://www.mongodb.com/) for working with database, and all examples will for [MongoDB](https://www.mongodb.com/), but you can use any database.

---

## Table of Contents

- [Working with database collection](#working-with-database-collection)
  - [Generate collection](#generate-collection)
  - [Run generate](#run-generate)
  - [Push collections](#push-collections)
- [Seeding](#seeding)
  - [Creating seeds](#creating-seeds)
  - [Run seed](#run-seed)

---

## Working with database collection

### Generate collection

1. Define collection model inside `prisma/schema.prisma`. For example `user` model:

   ```prisma
   // /prisma/schema.prisma

    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "mongodb"
      url      = env("DATABASE_URL")
    }
    model User {
      id       String  @id @default(auto()) @map("_id") @db.ObjectId
      fullName String
      email    String  @unique
      provider String  @default("Email")
      role     String  @default("User")
      status   String  @default("Inactive")
      password String
      hash     String?
      socialId String?
    }
   ```

1. Apply this model to database via [yarn prisma:generate](#run-generate).

### Run generate

```bash
yarn prisma:generate
```

### Push collections

```bash
yarn prisma:push
```

---

## Seeding

### Creating seeds

1. Go to `prisma/seed.ts` and create directory for your seed. For example `user`

   ```ts
   // /prisma/seed.ts
   import type { Prisma } from '@prisma/client';
   import { PrismaClient } from '@prisma/client';
   import * as bcrypt from 'bcrypt';
   import * as crypto from 'crypto';
   import { logger, randomStringGenerator } from '../src/utils';

   const prisma = new PrismaClient();
   const userData: Array<Prisma.UserCreateInput> = [
     {
       email: 'superadmin@gmail.com',
       fullName: 'SuperAdmin',
       password: '@Passw0rd1',
       role: 'SuperAdmin',
       status: 'Active',
     },
     {
       email: 'admin@gmail.com',
       fullName: 'Admin',
       password: '@Passw0rd1',
       role: 'Admin',
       status: 'Active',
     },
     {
       email: 'user@gmail.com',
       fullName: 'User',
       password: '@Passw0rd1',
       role: 'User',
       status: 'Active',
     },
   ];

   async function main() {
     logger.info(`Start seeding ...`);
     for (const user of userData) {
       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(user.password, salt);

       const hash = crypto
         .createHash('sha256')
         .update(randomStringGenerator())
         .digest('hex');
       const createdUser = await prisma.user.create({
         data: {
           ...user,
           hash,
           password: hashedPassword,
         },
       });
       logger.info(`Created user with id: ${createdUser.id}`);
     }
     logger.info(`Seeding finished.`);
   }

   main()
     .then(async () => {
       await prisma.$disconnect();
     })
     .catch(async (error) => {
       logger.error(error);
       await prisma.$disconnect();
       // eslint-disable-next-line unicorn/no-process-exit
       process.exit(1);
     });
   ```

1. Run [yarn prisma:seed](#run-seed)

### Run seed

```bash
yarn prisma:seed
```

---

Next: [Auth](auth.md)

GitHub: https://github.com/axnguyenit/nodejs-rest-api-boilerplate
