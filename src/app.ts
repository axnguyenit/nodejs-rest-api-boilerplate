import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express from 'express';
import basicAuth from 'express-basic-auth';
import type { SchemasObject } from 'openapi3-ts';
import type { Action } from 'routing-controllers';
import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';

const app = express();
useExpressServer(app, {
  cors: true,
  routePrefix: '/api/v1',
  classTransformer: true,
  controllers: [__dirname + '/modules/**/*.controller.ts'], // register controllers routes in our express app
  authorizationChecker: (_action: Action, _roles?: Array<string>) =>
    // perform queries based on token from request headers
    // const token = action.request.headers["authorization"];
    // return database.findUserByToken(token).roles.in(roles);
    false,
});

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
      title: 'env.app.name',
      description: 'env.app.description',
      version: '1',
    },
    paths: {
      default: `http://127.0.0.1:8080/api/v1`,
    },
    servers: [
      {
        url: `http://127.0.0.1:8080/api/v1`,
      },
    ],
  },
);

// swagger.servers = [
//   {
//     url: `http://127.0.0.1:8080/api`,
//   },
// ];

app.use(
  '/v1/docs',
  // eslint-disable-next-line no-constant-condition
  'admin'
    ? basicAuth({
        users: {
          admin: '1234',
        },
        challenge: true,
      })
    : (req, res, next) => next(),
  swaggerUi.serve,
  swaggerUi.setup(swagger),
);

// app.use(
//   '/docs',
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: '/swagger.json',
//     },
//   }),
// );

export default app;
