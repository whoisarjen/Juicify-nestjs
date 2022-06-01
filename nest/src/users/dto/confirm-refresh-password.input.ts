import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ConfirmRefreshPasswordInput {
    @Field(() => String, { description: 'Email' })
    email: string

    @Field(() => String, { description: 'Refresh password token' })
    refreshPasswordToken: string
}
