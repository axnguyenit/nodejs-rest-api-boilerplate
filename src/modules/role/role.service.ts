import type { Repository } from 'typeorm';

import type { Role } from './entities/role.entity';
import { RoleRepository } from './role.repository';

export class RoleService {
  private roleRepository: Repository<Role>;

  constructor() {
    this.roleRepository = RoleRepository;
  }

  findAll(): Promise<Array<Role>> {
    return this.roleRepository.find();
  }
}
