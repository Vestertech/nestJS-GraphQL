import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolvers';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingsResolver } from 'src/graphql/resolvers/UserSettingsResolver';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserSettingService } from './UserSettingService';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserService,
    UserSettingService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
