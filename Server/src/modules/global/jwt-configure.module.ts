// src/jwt-config/jwt-config.module.ts
import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global() // This makes the module available globally
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  exports: [JwtModule], // Exporting JwtModule to be used in other modules
})
export class JwtConfigModule {}
