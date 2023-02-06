import 'dotenv/config';

import { App } from './app';
import { DI } from './providers';

const app = new App(DI.instance.configService, DI.instance.databaseService);

void (async function () {
  try {
    await app.connectDatabase();

    console.info('Connect to database successfully!');
  } catch (error) {
    console.error(error);
  }

  app.listen();
})();
