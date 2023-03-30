import type { Repository } from 'typeorm';

import type { Status } from '~/modules/status/entities/status.entity';

export class StatusSeedService {
  constructor(private repository: Repository<Status>) {}

  async run() {
    // const count = await this.repository.count();
    // if (count === 0) {
    //   await this.repository.save([
    //     this.repository.create({
    //       id: AppStatus.Active,
    //       name: AppStatus[AppStatus.Active],
    //     }),
    //     this.repository.create({
    //       id: AppStatus.Inactive,
    //       name: AppStatus[AppStatus.Inactive],
    //     }),
    //   ]);
    // }
  }
}
