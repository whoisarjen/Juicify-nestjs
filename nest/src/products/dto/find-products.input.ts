import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindProductsInput {
	@Field(() => String, { description: 'Name of product' })
	name: string;
}