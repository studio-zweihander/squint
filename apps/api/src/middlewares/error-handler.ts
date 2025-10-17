import { Elysia } from 'elysia';
import { logger } from '../lib/logger';
import { config } from '../config/env';
import { HTTP_STATUS, ERROR_CODES } from '../config/constant';
import { generateErrorId } from '../lib/utils';

interface ErrorResponse {
  success: boolean;
  error: {
    id: string;
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  meta: {
    timestamp: string;
  };
}

export function createErrorHandler() {
  return new Elysia().onError(({ code, error: err, set }) => {
    const errorId = generateErrorId();
    const timestamp = new Date().toISOString();

    const errorCode = typeof code === 'string' ? code : ERROR_CODES.INTERNAL_ERROR;

    const errorMessage = err instanceof Error ? err.message : 'Erro interno do servidor';
    const errorStack = err instanceof Error ? err.stack : undefined;

    const response: ErrorResponse = {
      success: false,
      error: {
        id: errorId,
        code: errorCode,
        message: errorMessage,
        ...(config.NODE_ENV === 'development' && errorStack ? { details: { stack: errorStack } } : {}),
      },
      meta: { timestamp },
    };

    logger.error(
      {
        errorId,
        code: errorCode,
        message: errorMessage,
        stack: errorStack,
        path: (err as any).path,
      },
      'Erro capturado pelo handler'
    );

    set.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return response;
  });
}
