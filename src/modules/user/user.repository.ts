import AppDataSource from '../../database/data-source';
import { User } from './entities';

export const UserRepository = AppDataSource.getRepository(User);
