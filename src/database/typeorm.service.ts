import type { DataSource } from 'typeorm';

import type { ConfigService } from '../providers';
import AppDataSource from './data-source';

export class TypeOrmService {
  private dataSource: DataSource;

  constructor(private configService: ConfigService) {
    this.dataSource = AppDataSource;
  }

  async connect(): Promise<void> {
    await this.dataSource.initialize();
  }

  get appDataSource(): DataSource {
    return this.dataSource;
  }
}
