import pino from 'pino';
import { config } from '../config/env';

const isProduction = config.NODE_ENV === 'production';

const pinoConfig = {
  level: config.LOG_LEVEL,
  base: {
    env: config.NODE_ENV,
    service: 'squint-api',
  },
};

const transport = isProduction
  ? undefined
  : pino.transport({
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: false,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    });

export const logger = isProduction ? pino(pinoConfig) : pino(pinoConfig, transport);

export default logger;
