import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRET_KEY'),
                signOptions: {
                    expiresIn: configService.get('TOKEN_EXPIRE_TIME'),
                },
            }),
            inject: [ConfigService],
        }),
      ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
