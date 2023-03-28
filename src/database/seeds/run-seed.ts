import 'dotenv/config';

import { App } from '~/app';
import { DI } from '~/core';

import { RoleSeedService } from './role/role-seed.service';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = new App(
    DI.instance.configService,
    DI.instance.databaseService,
    DI.instance.loggerService,
  );

  const role = new RoleSeedService(DI.instance.roleRepository);
  const user = new UserSeedService(DI.instance.userRepository);

  await app.connectDatabase();
  await role.run();
  await user.run();
};

void runSeed();
