import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { UserSetting } from '../graphql/models/UserSetting';
import { mockUserSettings } from 'src/__mocks__/`mockUserSettings';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { UserService } from './UserService';
import { UserSettingService } from './UserSettingService';
export let incrementalId = 3;
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
    // mockUsers.find((user) => user.id === id);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }
  // Used to retrieve nested data
  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   // console.log(user);
  //   return this.userSettingService.getUserSettingById(user.id);
  // }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
