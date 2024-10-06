// http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

interface CustomHttpExceptionResponse {
  devMessage?: string;
  clientMessage?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Check if the exception has the custom response structure
    const responseBody = exception.getResponse() as CustomHttpExceptionResponse;

    const customResponse = {
      devMessage: responseBody.devMessage || 'Something has gone wrong ',
      clientMessage: responseBody.clientMessage || 'Server error',
      statusCode: status || 500,
      trackId: Math.floor(Math.random() * 10000000000),
    };

    response.send(customResponse).status(status);
  }
}
