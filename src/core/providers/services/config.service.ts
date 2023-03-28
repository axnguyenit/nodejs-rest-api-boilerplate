import type { MappedUnion } from '~/core';
import { config, valueFromMappedUnion } from '~/core';

export class ConfigService {
  public get<T = string | boolean>(key: MappedUnion<typeof config>): T {
    return valueFromMappedUnion<T>(config, key);
  }
}
