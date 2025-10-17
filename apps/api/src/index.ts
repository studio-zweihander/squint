import Elysia from 'elysia';
import cors from '@elysiajs/cors';
import staticPlugin from '@elysiajs/static';
import { config } from './config/env';
import { logger } from './lib/logger';
import { createErrorHandler } from './middlewares/error-handler';
import { createHealthRoutes } from './modules/health/health.routes';

function createApp() {
  const app = new Elysia()
    .use(cors({ origin: config.CORS_ORIGIN }))
    .use(createErrorHandler());

  app.onBeforeHandle(({ request, path }) => {
    logger.debug({ method: request.method, path }, 'Incoming request');
  });

  app.onAfterResponse(({ request, path, response }) => {
    const status = response instanceof Response ? response.status : 200;
    logger.debug({ method: request.method, path, status }, 'Response sent');
  });

  createHealthRoutes(app);

  return app;
}


async function bootstrap() {
  try {
    const app = createApp();

    app.listen(config.PORT, () => {
      logger.info(
        {
          port: config.PORT,
          host: config.HOST,
          environment: config.NODE_ENV,
        },
        `🚀 Servidor iniciado em http://${config.HOST}:${config.PORT}/api`
      );
    });
  } catch (error) {
    logger.error(error, 'Erro ao iniciar aplicação');
    process.exit(1);
  }
}

bootstrap();
