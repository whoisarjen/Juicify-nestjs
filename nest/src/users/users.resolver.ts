import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ConfirmUserInput } from './dto/confirm-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { Ctx } from 'src/types/context.type';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

    @Mutation(() => User)
    confirmUser(@Args('confirmUserInput') confirmUserInput: ConfirmUserInput) {
        return this.usersService.confirm(confirmUserInput);
    }

    @Query(() => User)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context: Ctx) {
        return this.usersService.login(loginUserInput, context);
    }

    // @Query(() => [User], { name: 'users' })
    // findAll() {
    //     return this.usersService.findAll();
    // }

    // @Query(() => User, { name: 'user' })
    // findOne(@Args('login', { type: () => String }) login: string) {
    //     return this.usersService.findOne(login);
    // }

    // @Mutation(() => User)
    // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    //     return this.usersService.update(updateUserInput.id, updateUserInput);
    // }
}
