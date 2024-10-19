"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
require("./config/instrument");
const common_1 = require("@nestjs/common");
const cookie_1 = require("@fastify/cookie");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors({
        origin: ['http://localhost:3001', 'https://ummahrchintah.vercel.app'],
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: '*',
        credentials: true,
    });
    app.register(cookie_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix('v1');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map