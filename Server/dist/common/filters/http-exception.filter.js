"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const trackId = Math.floor(Math.random() * 10000000000);
        Sentry.withScope((scope) => {
            scope.setTag('trackId', trackId.toString());
            scope.setExtra('requestBody', JSON.stringify(request.body));
            Sentry.captureException(exception);
        });
        const responseBody = exception.getResponse();
        if (status === 400 && Array.isArray(responseBody.message)) {
            const customValidationResponse = {
                statusCode: status,
                clientMessage: 'Validation failed',
                trackId,
                devMessage: responseBody.message.join(', '),
            };
            return response.status(status).send(customValidationResponse);
        }
        const customResponse = {
            devMessage: responseBody.devMessage || 'Something has gone wrong',
            clientMessage: responseBody.clientMessage || 'Server error',
            statusCode: status || 500,
            trackId,
        };
        response.status(status).send(customResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map