# NestJS GraphQL MySQL Tutorial

This repository contains code for a tutorial on building a NestJS GraphQL application with MySQL database integration, including end-to-end testing. The tutorial covers fundamental concepts and features of NestJS, GraphQL, TypeORM, MySQL, and Jest testing framework. You can find the code here

## TypeORM Configuration Properties

- `type`: Specifies the type of the database, in this case, MySQL.
- `host`: Specifies the host where the MySQL database is located, typically 'localhost'.
- `port`: Specifies the port number MySQL is listening on, usually 3306.
- `username`: Specifies the username for connecting to the MySQL database.
- `password`: Specifies the password for the specified username.
- `database`: Specifies the name of the database to connect to. It dynamically selects the database name based on the environment. If the environment is set to 'TEST', it uses the 'graphql*test' database; otherwise, it uses the 'graphql*' database.
- `entities`: An array of entity classes that TypeORM will manage. In this case, it includes the `User` and `UserSetting` entities.
- `synchronize`: Indicates whether TypeORM should automatically create a database schema based on entity classes. Setting it to true enables schema synchronization, which is useful for development but not recommended for production.
- `logging`: Specifies whether TypeORM should log database queries and schema changes. Setting it to false disables logging.

## GraphQL Module Configuration

- `driver`: Specifies the driver to use for handling GraphQL requests. In this case, ApolloDriver is used.
- `autoSchemaFile`: Specifies the file path to automatically generate the GraphQL schema. In this example, the schema is generated based on the TypeScript types and GraphQL decorators used in the application and saved to `src/schema.gql`.

## User Model

- `@Entity({ name: 'users' })`: Decorator provided by TypeORM to mark the class as an entity and specify the table name in the database.
- `@ObjectType()`: Decorator provided by NestJS GraphQL to mark the class as a GraphQL object type, enabling it to be used in GraphQL schemas.
- `@PrimaryGeneratedColumn()`: Decorator provided by TypeORM to define the primary key column of the entity and automatically generate its value.
- `id: number`: Property representing the unique identifier for each user. It's marked with the `@PrimaryGeneratedColumn()` decorator to signify it as the primary key.
- `username: string`: Property representing the username of the user. It's marked with the `@Column()` decorator to specify it as a database column.
- `displayName?: string`: Optional property representing the display name of the user. It's marked with the `@Column({ nullable: true })` decorator to indicate that it can be null in the database.
- `settings?: UserSetting`: Property representing the settings associated with the user. It's marked with the `@OneToOne()` decorator to establish a one-to-one relationship with the `UserSetting` entity. The `@JoinColumn()` decorator specifies the column in the `users` table that links to the `user_settings` table. It's also marked with the `@Field({ nullable: true })` decorator to allow it to be null in GraphQL queries.

## UserSettings Model

- Similar to User model with adjustments for the UserSetting entity.

## User Service

- Injection of `User` repository allows CRUD operations on User entity.
- `getUsers()`: Retrieves all users from the database.It uses this.usersRepository.find() to execute a query to fetch users. The relations: ['settings'] option specifies that it should also load associated settings for each user.
- `getUserById(id: number)`: Retrieves a user by their ID from the database.It uses this.usersRepository.findOne() with a condition to find a user by their ID. Similar to getUsers(), it also loads associated settings for the user.
- `createUser(createUserData: CreateUserInput)`: Creates a new user in the database.It creates a new User entity using this.usersRepository.create() with the provided data, and then saves it to the database using this.usersRepository.save().

## User Resolver

- Constructor injection of `UserService` and `UserSettingService` instances.This allows access to the functionality provided by these services within the resolver.
- `@Query((returns) => User, { nullable: true }) getUserById(@Args('id', { type: () => Int }) id: number):` Defines a GraphQL query named getUserById to retrieve a user by their ID. It's marked as nullable ({ nullable: true }) because it may return null if no user with the given ID is found.

- Defines GraphQL queries and mutations for retrieving and creating users.
- `@Mutation((returns) => User) createUser(@Args('createUserData') createUserData: CreateUserInput):`
  Defines a GraphQL mutation named createUser to create a new user. It takes createUserData as an argument, which is of type CreateUserInput. It returns the newly created user.

## End-to-End Testing

- `beforeAll()`: Sets up the testing environment before all tests in the test suite.
- `It` sets up the testing environment by creating a Nest application instance using Test.createTestingModule().
- `The AppModule` is imported to configure the application module for testing.
- `The compile()` method is called to compile the module asynchronously.
  After the module is compiled, an instance of the Nest application is created using `moduleFixture.createNestApplication()`.
  It also initializes the application by calling `app.init()`.
  Lastly, it synchronizes the database schema using dataSource.synchronize(true).

- `afterAll()`: Performs cleanup operations after all tests in the test suite have been completed.
- It's executed once after all tests in the test suite have been completed to perform cleanup operations.
- It also retrieves the DataSource instance from the Nest application using `app.get(DataSource)`.
  If the dataSource exists, it drops the database using `dataSource.dropDatabase()` and destroys the data source using `dataSource.destroy()`.
  Finally, it closes the Nest application instance using `app.close()`.

- Test cases included for querying users and creating a user.

## How to Run

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up MySQL database and configure the connection in the TypeORM configuration.
4. Run the application with `npm run start:dev`.
5. Run tests with `npm run test:e2e`.

## GitHub Repository

The code for this tutorial can be found on GitHub at [https://github.com/Vestertech/nestJS-GraphQL](https://github.com/Vestertech/nestJS-GraphQL).
