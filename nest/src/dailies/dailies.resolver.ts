import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { DailiesService } from './dailies.service';
import { Daily } from './entities/daily.entity';
import { CreateDailyInput } from './dto/create-daily.input';
import { UpdateDailyInput } from './dto/update-daily.input';
import { FindOneDailyInput } from './dto/find-one-daily.input';
import { Ctx } from 'src/types/context.type';

@Resolver(() => Daily)
export class DailiesResolver {
    constructor(private readonly dailiesService: DailiesService) {}

    @Mutation(() => Daily)
    createDaily(@Args('createDailyInput') createDailyInput: CreateDailyInput, @Context() context: Ctx) {
        return this.dailiesService.create(createDailyInput, context);
    }

    @Query(() => [Daily], { name: 'dailies', nullable: true })
    findAll() {
        return this.dailiesService.findAll();
    }

    @Query(() => Daily, { name: 'daily', nullable: true })
    findOne(@Args('findOneDailyInput') findOneDailyInput: FindOneDailyInput) {
        return this.dailiesService.findOne(findOneDailyInput);
    }

    @Mutation(() => Daily)
    updateDaily(@Args('updateDailyInput') updateDailyInput: UpdateDailyInput) {
        return this.dailiesService.update(updateDailyInput._id, updateDailyInput);
    }
}
