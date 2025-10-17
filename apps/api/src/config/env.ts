export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  HOST: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  UPLOAD_DIR: string;
  PROCESSED_DIR: string;
  MAX_FILE_SIZE: number;
  REDIS_URL: string;
  DATABASE_URL: string;
  CORS_ORIGIN: string;
  API_BASE_URL: string;
}

function parseEnv(): Environment {
  const requiredVars = ['NODE_ENV', 'PORT', 'LOG_LEVEL'];
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    NODE_ENV: (process.env.NODE_ENV || 'development') as Environment['NODE_ENV'],
    PORT: parseInt(process.env.PORT || '3000', 10),
    HOST: process.env.HOST || '0.0.0.0',
    LOG_LEVEL: (process.env.LOG_LEVEL || 'info') as Environment['LOG_LEVEL'],
    UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
    PROCESSED_DIR: process.env.PROCESSED_DIR || './processed',
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '209715200', 10),
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    DATABASE_URL: process.env.DATABASE_URL || 'file:./data/app.db',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  };
}

let env: Environment | null = null;

export function getEnv(): Environment {
  if (env) return env;
  env = parseEnv();
  return env;
}

export const config = getEnv();
