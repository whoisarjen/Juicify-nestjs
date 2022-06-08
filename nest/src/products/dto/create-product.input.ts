import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Name of product' })
  name: string;

  @Field(() => Float, {
    nullable: true,
  })
  proteins?: number;

  @Field(() => Float, {
    nullable: true,
  })
  carbs?: number;

  @Field(() => Float, {
    nullable: true,
  })
  sugar?: number;

  @Field(() => Float, {
    nullable: true,
  })
  fats?: number;

  @Field(() => Float, {
    nullable: true,
  })
  fiber?: number;

  @Field(() => Float, {
    nullable: true,
  })
  salt?: number;

  @Field(() => Float, {
    nullable: true,
  })
  ethanol?: number;

  @Field(() => Float, {
    nullable: true,
  })
  barcode?: number;

  @Field(() => Boolean, {
    nullable: true,
  })
  is_expecting_check?: boolean;
}
