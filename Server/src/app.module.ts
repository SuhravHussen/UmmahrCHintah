import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@sentry/nestjs/setup';
import { BlogsModule } from './modules/blogs/blogs.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SentryModule.forRoot(),
    BlogsModule,
    AuthModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
