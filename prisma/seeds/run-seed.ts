import { PrismaClient } from '@prisma/client';

import { DI } from '../../src/providers';
import { UserSeedService } from './user-seed.service';

const prisma = new PrismaClient();

async function runSeed() {
  const userSeed = new UserSeedService(DI.instance.prismaService);
  await userSeed.run();
}

void (async function () {
  try {
    await runSeed();
    await prisma.$disconnect();
  } catch {
    await prisma.$disconnect();
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
})();
