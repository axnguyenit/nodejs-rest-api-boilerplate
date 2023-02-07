import type { Repository } from 'typeorm';

import { AppRole } from '~/modules/role/role.enum';
import { AppStatus } from '~/modules/status/status.enum';
import type { User } from '~/modules/user/entities/user.entity';

export class UserSeedService {
  constructor(private repository: Repository<User>) {}

  async run() {
    const superAdminEmail = 'superadmin@gmail.com';
    const adminEmail = 'admin@gmail.com';
    const userEmail = 'user@gmail.com';

    const countSuperAdmin = await this.repository.count({
      where: {
        email: superAdminEmail,
      },
    });

    if (countSuperAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          fullName: 'SuperAdmin',
          email: superAdminEmail,
          password: '@Passw0rd1',
          role: {
            id: AppRole.SuperAdmin,
            name: AppRole[AppRole.SuperAdmin],
          },
          status: {
            id: AppStatus.Active,
            name: AppStatus[AppStatus.Active],
          },
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        email: adminEmail,
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          fullName: 'RegularAdmin',
          email: adminEmail,
          password: '@Passw0rd1',
          role: {
            id: AppRole.Admin,
            name: AppRole[AppRole.Admin],
          },
          status: {
            id: AppStatus.Active,
            name: AppStatus[AppStatus.Active],
          },
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        email: userEmail,
      },
    });

    if (countUser === 0) {
      await this.repository.save(
        this.repository.create({
          fullName: 'User',
          email: userEmail,
          password: '@Passw0rd1',
          role: {
            id: AppRole.User,
            name: AppRole[AppRole.User],
          },
          status: {
            id: AppStatus.Active,
            name: AppStatus[AppStatus.Active],
          },
        }),
      );
    }
  }
}
