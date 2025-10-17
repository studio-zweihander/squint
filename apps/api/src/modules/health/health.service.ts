import { logger } from '../../lib/logger';
import { HEALTH_STATUS } from '../../config/constant';

export interface HealthCheck {
  status: (typeof HEALTH_STATUS)[keyof typeof HEALTH_STATUS];
  timestamp: string;
  uptime: number;
  environment: string;
  checks?: {
    memory?: boolean;
    disk?: boolean;
    redis?: boolean;
    database?: boolean;
  };
}

export class HealthService {
  private startTime = Date.now();

  getHealth(): HealthCheck {
    const uptime = (Date.now() - this.startTime) / 1000;

    return {
      status: HEALTH_STATUS.HEALTHY,
      timestamp: new Date().toISOString(),
      uptime,
      environment: process.env.NODE_ENV || 'development',
    };
  }

  getLiveness(): { alive: boolean; timestamp: string } {
    return {
      alive: true,
      timestamp: new Date().toISOString(),
    };
  }

  getReadiness(): { ready: boolean; timestamp: string; checks: Record<string, boolean> } {
    const checks = {
      memory: this.checkMemory(),
      disk: this.checkDisk(),
    };

    const ready = Object.values(checks).every((check) => check === true);

    return {
      ready,
      timestamp: new Date().toISOString(),
      checks,
    };
  }

  private checkMemory(): boolean {
    const memUsage = process.memoryUsage();
    const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

    return memUsagePercent < 90;
  }

  private checkDisk(): boolean {
    // TODO: Implementar checagem real de disco
    return true;
  }
}

export const healthService = new HealthService();
