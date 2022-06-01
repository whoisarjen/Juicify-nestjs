import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { get, set } from 'lodash'
import { decode } from './jwt.utils';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Ctx } from 'src/types/context.type';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [
                UsersModule,
                ConfigModule,
            ],
            useFactory: async (usersService: UsersService, configService: ConfigService) => ({
                debug: true,
                playground: true,
                autoSchemaFile: join(process.cwd(), 'schema.gql'),
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true,
                },
                cors: configService.get('CORS'),
                context: async (context: Ctx) => {
                    const token = get(context.req, `cookies.${configService.get('TOKEN_NAME')}`)
                    const user = token ? await decode(token) : null

                    if (user) {
                        set(context.req, 'user', user)
                        return context
                    }

                    const refresh_token = get(context.req, `cookies.${configService.get('REFRESH_TOKEN_NAME')}`)
                    const login = refresh_token ? get(await decode(refresh_token), ['login']) : null

                    if (login) {
                        const newUserObject = await usersService.login({ login, password: null }, context, true)
                        set(context.req, 'user', newUserObject)
                        return context
                    }

                    await usersService.logout(context)

                    return context
                }
            }),
            inject: [
                UsersService,
                ConfigService,
            ],
        }),
    ],
})
export class GraphQLModuleUtils { }
