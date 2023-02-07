import AppDataSource from '../../database/data-source';
import { Status } from './entities/status.entity';

export const StatusRepository = AppDataSource.getRepository(Status);
