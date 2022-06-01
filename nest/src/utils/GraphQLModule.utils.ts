import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { get, set } from 'lodash'
import { decode } from './jwt.utils';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                debug: true,
                playground: true,
                autoSchemaFile: join(process.cwd(), 'schema.gql'),
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true,
                },
                cors: configService.get('CORS'),
                context: ({ req, res }) => {
                    const token = get(req, 'cookies.token')
                    const user = token ? decode(token) : null

                    if (user) {
                        set(req, 'user', user)
                    }

                    return { req, res }
                }
            }),
            inject: [ConfigService],
        }),
    ],
})
export class GraphQLModuleUtils { }
