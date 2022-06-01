import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'Login' })
  login: string

  @Field(() => String, { description: 'Password' })
  password: string
}
