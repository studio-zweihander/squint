import { describe, it, expect } from 'bun:test';
import { logger } from '../../src/lib/logger';

describe('Logger', () => {
  it('deve existir e ter métodos de log', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('deve registrar mensagens sem erros', () => {
    expect(() => {
      logger.debug('Test debug message');
      logger.info('Test info message');
      logger.warn('Test warn message');
    }).not.toThrow();
  });

  it('deve aceitar objetos como contexto', () => {
    expect(() => {
      logger.info({ userId: '123', action: 'login' }, 'User logged in');
    }).not.toThrow();
  });
});
