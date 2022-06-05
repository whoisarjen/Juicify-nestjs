import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Name of product' })
  name: string;

  @Field(() => Float, {
    nullable: true,
    description: 'Number of grams per 100g/ml',
  })
  proteins?: number;

  @Field(() => Float, {
    nullable: true,
    description: 'Number of grams per 100g/ml',
  })
  carbs?: number;

  @Field(() => Float, {
    nullable: true,
    description: 'Number of grams per 100g/ml',
  })
  fats?: number;
}
