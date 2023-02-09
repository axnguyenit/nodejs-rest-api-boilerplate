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
