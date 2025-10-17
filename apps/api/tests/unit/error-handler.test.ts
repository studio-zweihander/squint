import { describe, it, expect } from 'bun:test';
import Elysia from 'elysia';
import { createErrorHandler } from '../../src/middlewares/error-handler';
import { HTTP_STATUS, ERROR_CODES } from '../../src/config/constant';

describe('Error Handler Middleware', () => {
  it('deve ser criado sem erros', () => {
    const handler = createErrorHandler();
    expect(handler).toBeDefined();
    expect(handler instanceof Elysia).toBe(true);
  });

  it('deve ter método onError configurado', () => {
    const handler = createErrorHandler();
    expect(handler).toBeDefined();
  });

  it('deve retornar resposta formatada com erro', async () => {
    const app = new Elysia()
      .use(createErrorHandler())
      .get('/test-error', () => {
        throw new Error('Test error');
      });

    const response = await app.handle(new Request('http://localhost/test-error'));
    const data = await response.json();

    expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
    expect(data.error.id).toBeDefined();
    expect(data.error.message).toBe('Test error');
    expect(data.meta.timestamp).toBeDefined();
  });

  it('deve gerar ID de erro único para cada erro', async () => {
    const app = new Elysia()
      .use(createErrorHandler())
      .get('/error1', () => {
        throw new Error('Error 1');
      })
      .get('/error2', () => {
        throw new Error('Error 2');
      });

    const response1 = await app.handle(new Request('http://localhost/error1'));
    const response2 = await app.handle(new Request('http://localhost/error2'));

    const data1 = await response1.json();
    const data2 = await response2.json();

    expect(data1.error.id).not.toBe(data2.error.id);
    expect(data1.error.id).toMatch(/^ERR-/);
    expect(data2.error.id).toMatch(/^ERR-/);
  });

  it('deve incluir stack trace em desenvolvimento', async () => {
    process.env.NODE_ENV = 'development';

    const app = new Elysia()
      .use(createErrorHandler())
      .get('/test', () => {
        throw new Error('Development error');
      });

    const response = await app.handle(new Request('http://localhost/test'));
    const data = await response.json();

    expect(data.error.details).toBeDefined();
    expect(data.error.details.stack).toBeDefined();
  });

  it('deve omitir stack trace em produção', async () => {
    process.env.NODE_ENV = 'production';

    const app = new Elysia()
      .use(createErrorHandler())
      .get('/test', () => {
        throw new Error('Production error');
      });

    const response = await app.handle(new Request('http://localhost/test'));
    const data = await response.json();

    expect(data.error.details).toBeUndefined();
  });
});
