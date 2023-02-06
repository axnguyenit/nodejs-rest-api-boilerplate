import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import type { Application } from 'express';
import type { SchemasObject } from 'openapi3-ts';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';

import type { ConfigService } from './providers';
export class Swagger {
  constructor(private app: Application, private configService: ConfigService) {}

  public initialize() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { validationMetadatas } = getFromContainer(MetadataStorage) as any;
    const schemas = <SchemasObject>(
      validationMetadatasToSchemas(validationMetadatas)
    );

    const swagger = routingControllersToSpec(
      getMetadataArgsStorage(),
      {},
      {
        components: {
          schemas,
          securitySchemes: {
            basicAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [{ accessToken: [], userProfileToken: [] }],
        info: {
          // eslint-disable-next-line @typescript-eslint/keyword-spacing
          title: <string>this.configService.get('APP_NAME'),
          version: '1.0',
        },
        paths: {
          default: `${this.configService.get('BACKEND_DOMAIN')}/api/v1`,
        },
        servers: [
          {
            url: `${this.configService.get('BACKEND_DOMAIN')}/api/v1`,
          },
        ],
      },
    );

    this.app.use(
      '/v1/docs',
      // eslint-disable-next-line no-constant-condition
      // (req, res, next) => next(),
      swaggerUi.serve,
      swaggerUi.setup(swagger),
    );
  }
}
