import { healthService } from './health.service';
import { logger } from '../../lib/logger';

export class HealthController {
  health() {
    logger.debug('Health check requested');
    return {
      success: true,
      data: healthService.getHealth(),
    };
  }

  liveness() {
    logger.debug('Liveness check requested');
    return {
      success: true,
      data: healthService.getLiveness(),
    };
  }

  readiness() {
    logger.debug('Readiness check requested');
    return {
      success: true,
      data: healthService.getReadiness(),
    };
  }
}

export const healthController = new HealthController();
