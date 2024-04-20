import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/UserSetting';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingsInput';
// import { mockUserSettings } from 'src/__mocks__/`mockUserSettings';
import { UserSettingService } from '../../users/UserSettingService';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingService) {}
  @Mutation((returns) => UserSetting)
  async createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    // console.log(createUserSettingsData);
    // mockUserSettings.push(createUserSettingsData);
    const userSetting = await this.userSettingsService.createUserSettings(
      createUserSettingsData,
    );
    return userSetting;
  }
}
