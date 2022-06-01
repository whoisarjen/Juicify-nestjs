import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RequestRefreshPasswordInput {
  @Field(() => String, { description: 'Email' })
  email: string
}
