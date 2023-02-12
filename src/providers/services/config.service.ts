export class ConfigService {
  public get<T = string | boolean>(path: string): T {
    const value = process.env[path];

    if (value === undefined) {
      throw new Error(`NotFoundConfig: ${path}`);
    }

    if (['false', 'true'].includes(value)) {
      return <T>(value === 'true');
    }

    return <T>value;
  }
}
