export const app = {
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  author: process.env.APP_AUTHOR,
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain: process.env.FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: Number.parseInt(<string>process.env.PORT, 10) || 1104,
  routePrefix: process.env.ROUTE_PREFIX || '/api/v1',
};
