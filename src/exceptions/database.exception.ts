import {
  QueryFailedError,
  TypeORMError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const { name, message, stack } = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      name: name,
      exception: exception,
      message: message,
      stack: stack,
      detail: (exception as any).detail,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
