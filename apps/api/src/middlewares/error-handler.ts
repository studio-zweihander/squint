import { Elysia, error } from 'elysia';
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

    const response: ErrorResponse = {
      success: false,
      error: {
        id: errorId,
        code: code === 'UNKNOWN' ? ERROR_CODES.INTERNAL_ERROR : code,
        message: err.message || 'Erro interno do servidor',
        ...(config.NODE_ENV === 'development' && { details: { stack: err.stack } }),
      },
      meta: { timestamp },
    };

    logger.error(
      {
        errorId,
        code,
        message: err.message,
        stack: err.stack,
        path: (err as any).path,
      },
      'Erro capturado pelo handler'
    );

    set.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return response;
  });
}
