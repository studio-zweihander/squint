import { Elysia } from 'elysia';
import { healthController } from './health.controller';

export function createHealthRoutes(app: Elysia) {
  return app.group('/api', app =>
    app
      .get('/health', () => healthController.health())
      .get('/health/live', () => healthController.liveness())
      .get('/health/ready', () => healthController.readiness())
  );
}
