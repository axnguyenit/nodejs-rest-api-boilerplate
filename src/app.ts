import type { Application } from 'express';
import express from 'express';
import { useExpressServer } from 'routing-controllers';

import { authorizationChecker } from './middlewares';
import type { ConfigService } from './providers';
import { Swagger } from './swagger';
import { logger } from './utils';

export class App {
  private app: Application;

  constructor(private configService: ConfigService) {
    this.app = express();

    this.initialize();
    this.initializeSwagger();
  }

  public listen() {
    this.app.listen(this.configService.get('PORT'), () => {
      logger.info(
        `Listening on http://[::1]:${this.configService.get('PORT')}`,
        { prefix: 'Express' },
      );
    });
  }

  private initialize() {
    useExpressServer(this.app, {
      cors: true,
      routePrefix: `${this.configService.get('ROUTE_PREFIX')}`,
      classTransformer: true,
      controllers: [__dirname + '/modules/**/*.controller.ts'],
      authorizationChecker,
    });
  }

  private initializeSwagger() {
    const swagger = new Swagger(this.app, this.configService);
    swagger.initialize();
  }
}
