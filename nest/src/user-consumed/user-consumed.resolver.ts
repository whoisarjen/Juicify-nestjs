import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserConsumedService } from './user-consumed.service';
import { UserConsumed } from './entities/user-consumed.entity';

@Resolver(() => UserConsumed)
export class UserConsumedResolver {
    constructor(private readonly userConsumedService: UserConsumedService) {}

    @Query(() => [UserConsumed], { name: 'userConsumedPerDays' })
    findAll() {
        return this.userConsumedService.findAll();
    }

    @Query(() => UserConsumed, { name: 'userConsumedPerDay' })
    findOne() {
        return this.userConsumedService.findOneDay();
    }
}
