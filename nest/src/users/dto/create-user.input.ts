import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email' })
  email: string

  @Field(() => String, { description: 'Login' })
  login: string

  @Field(() => String, { description: 'Password' })
  password: string

  @Field(() => Boolean, { description: 'Sex' })
  sex: boolean

  @Field(() => Int, { description: 'Height' })
  height: number
}
