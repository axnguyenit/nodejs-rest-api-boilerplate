import 'dotenv/config';
import 'reflect-metadata';

// import 'module-alias/register'; // need to enable when build
import { App } from './app';
import { DI } from './providers';

const app = new App(DI.instance.configService, DI.instance.loggerService);

app.listen();
