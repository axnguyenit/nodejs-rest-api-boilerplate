import 'reflect-metadata';
import 'dotenv/config';
import 'module-alias/register';

import { DI } from '~/core';

import { App } from './app';

const app = new App(
  DI.instance.configService,
  DI.instance.databaseService,
  DI.instance.loggerService,
);

void (async function () {
  try {
    await app.connectDatabase();
    app.listen();
  } catch (error) {
    console.error(error);
  }
})();
