import type { Repository } from 'typeorm';

import type { Role } from '~/modules/role';
// import { AppRole } from '~/modules/role';

export class RoleSeedService {
  constructor(private repository: Repository<Role>) {}

  async run() {
    // const countSuperAdmin = await this.repository.count({
    //   where: {
    //     id: AppRole.SuperAdmin,
    //   },
    // });
    // if (countSuperAdmin === 0) {
    //   await this.repository.save(
    //     this.repository.create({
    //       id: AppRole.SuperAdmin,
    //       name: AppRole[AppRole.SuperAdmin],
    //     }),
    //   );
    // }
    // const countAdmin = await this.repository.count({
    //   where: {
    //     id: AppRole.Admin,
    //   },
    // });
    // if (countAdmin === 0) {
    //   await this.repository.save(
    //     this.repository.create({
    //       id: AppRole.Admin,
    //       name: AppRole[AppRole.Admin],
    //     }),
    //   );
    // }
    // const countUser = await this.repository.count({
    //   where: {
    //     id: AppRole.User,
    //   },
    // });
    // if (countUser === 0) {
    //   await this.repository.save(
    //     this.repository.create({
    //       id: AppRole.User,
    //       name: AppRole[AppRole.User],
    //     }),
    //   );
    // }
  }
}
