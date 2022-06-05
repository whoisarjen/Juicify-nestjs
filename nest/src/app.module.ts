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
import { DailiesModule } from './dailies/dailies.module';
import * as Joi from 'joi';
import { DatabaseUtils } from './utils/database.utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [config],
            // validationSchema: Joi.object({
            //     POSTGRES_HOST: Joi.string().required(),
            //     POSTGRES_PORT: Joi.number().required(),
            //     POSTGRES_USER: Joi.string().required(),
            //     POSTGRES_PASSWORD: Joi.string().required(),
            //     POSTGRES_DB: Joi.string().required(),
            //     PORT: Joi.number(),
            // }),
        }),
        DatabaseUtils,
        MailerModuleUtils,
        GraphQLModuleUtils,
        MongooseModuleUtils,
        UsersModule,
        ProductsModule,
        DailiesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
