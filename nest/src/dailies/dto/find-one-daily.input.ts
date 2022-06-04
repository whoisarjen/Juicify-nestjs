import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import * as moment from "moment";

@InputType()
export class FindOneDailyInput {
    @Field(() => String, { description: 'Login' })
    login: string

    @Field(() => String, { description: 'Day od daily' })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    whenAdded: string
}
