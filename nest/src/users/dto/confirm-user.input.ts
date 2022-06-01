import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ConfirmUserInput {
  @Field(() => String, { description: 'Email' })
  email: string

  @Field(() => String, { description: 'Confirmation token' })
  confirmationToken: string
}
