import type { Repository } from 'typeorm';

import type { Role } from './entities/role.entity';

export class RoleService {
  constructor(private roleRepository: Repository<Role>) {}

  findAll(): Promise<Array<Role>> {
    return this.roleRepository.find();
  }
}
