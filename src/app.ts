import type { Application } from 'express';
import express from 'express';
import type { Action } from 'routing-controllers';
import { useExpressServer } from 'routing-controllers';

import type { TypeOrmService } from './database/typeorm.service';
import type { ConfigService, Logger } from './providers';
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error occurred: ${error.message}`);
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

  public async connectDatabase() {
    await this.database.connect();
  }

  private initializeSwagger() {
    const swagger = new Swagger(this.app, this.configService);
    swagger.initialize();
  }
}
