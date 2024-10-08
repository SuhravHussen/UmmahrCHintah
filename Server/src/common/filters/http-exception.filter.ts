import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as Sentry from '@sentry/node';

interface CustomErrorResponse {
  message?: string[];
  error?: string;
  statusCode?: number;
  devMessage?: string | object | any[];
  clientMessage?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>(); // Extracting the request object
    const status = exception.getStatus();

    const trackId = Math.floor(Math.random() * 10000000000); // Generating trackId
    // Adding extra context with trackId and request body to Sentry
    Sentry.withScope((scope) => {
      scope.setTag('trackId', trackId.toString()); // Attaching trackId to the Sentry log
      scope.setExtra('requestBody', JSON.stringify(request.body)); // Attaching request body to the Sentry log
      Sentry.captureException(exception); // Sending the exception to Sentry
    });

    // Check if the exception has the custom response structure
    const responseBody = exception.getResponse() as CustomErrorResponse;

    // Handle validation errors specifically
    if (status === 400 && Array.isArray(responseBody.message)) {
      const customValidationResponse = {
        statusCode: status,
        clientMessage: 'Validation failed',
        trackId, // Include trackId in the response to the client
        devMessage: responseBody,
      };

      return response.status(status).send(customValidationResponse); // Send the custom validation response
    }

    // Fallback for other exceptions
    const customResponse = {
      devMessage: responseBody.devMessage || 'Something has gone wrong',
      clientMessage: responseBody.clientMessage || 'Server error',
      statusCode: status || 500,
      trackId, // Include trackId in the response to the client
    };

    response.status(status).send(customResponse); // Send the custom response
  }
}
