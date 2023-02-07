import 'dotenv/config';

import { App } from '../../app';
import { DI } from '../../providers';
import { RoleSeedService } from './role/role-seed.service';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = new App(DI.instance.configService, DI.instance.databaseService);
  const role = new RoleSeedService(DI.instance.roleRepository);
  const status = new StatusSeedService(DI.instance.statusRepository);
  const user = new UserSeedService(DI.instance.userRepository);

  await app.connectDatabase();
  await role.run();
  await status.run();
  await user.run();
};

void runSeed();
