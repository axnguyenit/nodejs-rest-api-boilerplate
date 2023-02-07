import AppDataSource from '../../database/data-source';
import { Role } from './entities/role.entity';

export const RoleRepository = AppDataSource.getRepository(Role);
