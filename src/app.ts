import type { Application } from 'express';
import express from 'express';
import { useExpressServer } from 'routing-controllers';

import type { ConfigService, Logger } from '~/core';
import {
  authorizationChecker,
  currentUserChecker,
  ErrorHandlerMiddleware,
} from '~/core';

import type { TypeOrmService } from './database/typeorm.service';
import { Swagger } from './swagger';

export class App {
  private app: Application;

  constructor(
    private configService: ConfigService,
    private database: TypeOrmService,
    private loggerService: Logger,
  ) {
    this.app = express();

    this.initialize();
    this.initializeSwagger();
  }

  public listen() {
    try {
      this.app.listen(this.configService.get('app.port'), () => {
        this.loggerService.info(
          `Listening on http://[::1]:${this.configService.get('app.port')}`,
          { prefix: 'Express' },
        );
        this.loggerService.info(
          `http://[::1]:${this.configService.get('app.port')}/v1/docs`,
          { prefix: 'API Docs' },
        );
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error occurred: ${error.message}`);
    }
  }

  private initialize() {
    useExpressServer(this.app, {
      cors: true,
      routePrefix: `${this.configService.get('app.routePrefix')}`,
      classTransformer: true,
      controllers: [__dirname + '/modules/**/*.controller.ts'],
      authorizationChecker,
      currentUserChecker,
      middlewares: [ErrorHandlerMiddleware],
    });
  }

  public async connectDatabase() {
    await this.database.connect();
  }

  private initializeSwagger() {
    const swagger = new Swagger(this.app, this.configService);
    swagger.initialize();
  }
}
