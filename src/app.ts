import type { Application } from 'express';
import express from 'express';
import type { Action } from 'routing-controllers';
import { useExpressServer } from 'routing-controllers';

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
    try {
      this.app.listen(this.configService.get('PORT'), () => {
        logger.info(
          `Server is running on http://[::1]:${this.configService.get('PORT')}`,
        );
        const a = {
          clear: true,
          timestamp: {
            clear: true,
            timestamp: true,
          },
        };
        logger.info(a);
        logger.info(a);
        logger.info(a);
        logger.error('thisi is log');
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(`Error occurred: ${error.message}`);
    }
  }

  private initialize() {
    useExpressServer(this.app, {
      cors: true,
      routePrefix: `${this.configService.get('ROUTE_PREFIX')}`,
      classTransformer: true,
      controllers: [__dirname + '/modules/**/*.controller.ts'],
      authorizationChecker: (_action: Action, _roles?: Array<string>) =>
        // perform queries based on token from request headers
        // const token = action.request.headers["authorization"];
        // return database.findUserByToken(token).roles.in(roles);
        false,
    });
  }

  private initializeSwagger() {
    const swagger = new Swagger(this.app, this.configService);
    swagger.initialize();
  }
}
