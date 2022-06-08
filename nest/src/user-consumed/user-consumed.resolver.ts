import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { UserConsumedService } from './user-consumed.service';
import { UserConsumed } from './entities/user-consumed.entity';
import { FindUserConsumedInput } from './dto/find-user-consumed';
import { Ctx } from 'src/types/context.type';

@Resolver(() => UserConsumed)
export class UserConsumedResolver {
    constructor(private readonly userConsumedService: UserConsumedService) {}

    @Query(() => [UserConsumed], { name: 'userConsumedPerDays' })
    findAll() {
        return this.userConsumedService.findAll();
    }

    @Query(() => UserConsumed, { name: 'userConsumedPerDay' })
    findOne(
        @Args('findUserConsumedInput') findUserConsumedInput: FindUserConsumedInput,
        @Context() context: Ctx
    ) {
        return this.userConsumedService.findOneDay(findUserConsumedInput, context);
    }
}
