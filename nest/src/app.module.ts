import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/common.config';
import { GraphQLModuleUtils } from './utils/graphQLModule.utils';
import { UsersModule } from './users/users.module';
import { MongooseModuleUtils } from './utils/mongooseModule.utils';
import { MailerModuleUtils } from './utils/mailerModule.utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [config],
        }),
        MailerModuleUtils,
        GraphQLModuleUtils,
        MongooseModuleUtils,
        UsersModule,
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
