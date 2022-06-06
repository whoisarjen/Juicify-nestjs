import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ConfirmUserInput } from './dto/confirm-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { Ctx } from 'src/types/context.type';
import { RequestRefreshPasswordInput } from './dto/request-refresh-password.input';
import { ConfirmRefreshPasswordInput } from './dto/confirm-refresh-password.input';
import { Public } from 'src/decorators/public.decorator';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}
 
    @Public()
    @Mutation(() => User, { nullable: true })
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

    @Public()
    @Mutation(() => User, { nullable: true })
    confirmUser(@Args('confirmUserInput') confirmUserInput: ConfirmUserInput) {
        return this.usersService.confirm(confirmUserInput);
    }

    @Public()
    @Query(() => User, { nullable: true })
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context: Ctx) {
        return this.usersService.login(loginUserInput, context);
    }

    @Public()
    @Query(() => User, { nullable: true })
    logout(@Context() context: Ctx) {
        return this.usersService.logout(context);
    }

    @Public()
    @Query(() => User, { nullable: true })
    requestRefreshPassword(@Args('requestRefreshPasswordInput') requestRefreshPasswordInput: RequestRefreshPasswordInput) {
        return this.usersService.requestRefreshPassword(requestRefreshPasswordInput);
    }

    @Public()
    @Query(() => User, { nullable: true })
    confirmRefreshPassword(@Args('confirmRefreshPasswordInput') confirmRefreshPasswordInput: ConfirmRefreshPasswordInput) {
        return this.usersService.confirmRefreshPassword(confirmRefreshPasswordInput);
    }
}
