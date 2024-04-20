import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSettingsResolver } from './graphql/resolvers/UserSettingsResolver';
import { User } from './graphql/models/User';
import { UserSetting } from './graphql/models/UserSetting';
import { UsersModule } from './users/users.module';

console.log(process.env.NODE_ENV === 'TEST');
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'testuser123',
      database: process.env.NODE_ENV === 'TEST' ? 'graphql_test' : 'graphql_',
      entities: [User, UserSetting],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
