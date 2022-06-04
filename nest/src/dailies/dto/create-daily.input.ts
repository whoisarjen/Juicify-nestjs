import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import * as moment from 'moment';
import { Daily } from '../entities/daily.entity';

@InputType()
export class CreateDailyInput extends PartialType(Daily) {
    @Field(() => Date, { description: 'Daily for date' })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    whenAdded: Date;
}
