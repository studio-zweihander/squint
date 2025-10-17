import { describe, it, expect, beforeEach } from 'bun:test';

describe('Environment Configuration', () => {
  beforeEach(() => {
    delete (global as any).env;
  });

  it('deve carregar variáveis de ambiente com valores padrão', () => {
    process.env.NODE_ENV = 'development';
    process.env.PORT = '3000';
    process.env.LOG_LEVEL = 'debug';

    const { getEnv } = require('../../src/config/env');
    const env = getEnv();

    expect(env.NODE_ENV).toBe('development');
    expect(env.PORT).toBe(3000);
    expect(env.LOG_LEVEL).toBe('debug');
  });

  it('deve usar valores padrão quando variáveis não estão definidas', () => {
    delete process.env.UPLOAD_DIR;
    delete process.env.PROCESSED_DIR;

    const { getEnv } = require('../../src/config/env');
    const env = getEnv();

    expect(env.UPLOAD_DIR).toBe('./uploads');
    expect(env.PROCESSED_DIR).toBe('./processed');
  });

  it('deve fazer parse de números corretamente', () => {
    process.env.MAX_FILE_SIZE = '209715200';
    process.env.NODE_ENV = 'development';
    process.env.PORT = '3000';
    process.env.LOG_LEVEL = 'debug';

    const { getEnv } = require('../../src/config/env');
    const env = getEnv();

    expect(env.MAX_FILE_SIZE).toBe(209715200);
    expect(typeof env.MAX_FILE_SIZE).toBe('number');
  });
});
