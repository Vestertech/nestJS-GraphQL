import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/userSettings';
import { createUserSettingsInput } from 'src/utils/CreateUserSettingsInput';
import { mockUserSettings } from 'src/__mocks__/`mockUserSettings';

@Resolver()
export class UserSettingsResolver {
  @Mutation((returns) => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: createUserSettingsInput,
  ) {
    console.log(createUserSettingsData);
    mockUserSettings.push(createUserSettingsData);
    return createUserSettingsData;
  }
}
