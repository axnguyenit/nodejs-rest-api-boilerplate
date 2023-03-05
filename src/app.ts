import type { Application } from 'express';
import express from 'express';
import { useExpressServer } from 'routing-controllers';

import {
  authorizationChecker,
  currentUserChecker,
  ErrorHandlerMiddleware,
} from './middleware';
import type { ConfigService } from './providers';
import type { Logger } from './providers/services';
import { Swagger } from './swagger';

export class App {
  private app: Application;

  constructor(
    private configService: ConfigService,
    private loggerService: Logger,
  ) {
    this.app = express();

    this.initialize();
    this.initializeSwagger();
  }

  public listen() {
    this.app.listen(this.configService.get('PORT'), () => {
      this.loggerService.info(
        `Listening on http://[::1]:${this.configService.get('PORT')}`,
        { prefix: 'Express' },
      );
      this.loggerService.info(
        `http://[::1]:${this.configService.get('PORT')}/v1/docs`,
        { prefix: 'API Docs' },
      );
    });
  }

  private initialize() {
    // UseInterceptor(ValidationInterceptor);
    useExpressServer(this.app, {
      cors: true,
      routePrefix: this.configService.get<string>('ROUTE_PREFIX'),
      classTransformer: true,
      validation: true,
      controllers: [__dirname + '/modules/**/*.controller.{ts,js}'],
      authorizationChecker,
      currentUserChecker,
      middlewares: [ErrorHandlerMiddleware],
    });
  }

  private initializeSwagger() {
    const swagger = new Swagger(this.app, this.configService);
    swagger.initialize();
  }
}
