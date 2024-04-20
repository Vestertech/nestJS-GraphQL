import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolvers';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { UserSettingsResolver } from '../graphql/resolvers/UserSettingsResolver';
import { UserSetting } from '../graphql/models/UserSetting';
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
