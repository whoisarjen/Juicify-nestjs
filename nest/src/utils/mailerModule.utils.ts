import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => (configService.get('MAILER_CONFIG')),
            inject: [ConfigService],
        }),
    ],
})
export class MailerModuleUtils {}
