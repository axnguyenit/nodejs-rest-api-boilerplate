import 'dotenv/config';
import 'reflect-metadata';

import { App } from './app';
import { DI } from './providers';

const app = new App(DI.instance.configService);

app.listen();
