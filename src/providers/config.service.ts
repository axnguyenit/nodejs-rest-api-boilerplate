import { Service } from 'typedi';

@Service()
export class ConfigService {
  public get(path: string) {
    const value = process.env[path];

    if (value === undefined) {
      throw new Error(`NotFoundConfig: ${path}`);
    }

    if (['false', 'true'].includes(value)) {
      return value === 'true';
    }

    return value;
  }
}
