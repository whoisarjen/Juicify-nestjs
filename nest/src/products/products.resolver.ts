import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { FindProductsInput } from './dto/find-products.input';
import { Ctx } from 'src/types/context.type';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Mutation(() => Product)
    async createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
        @Context() context: Ctx,
    ) {
        return await this.productsService.create(createProductInput, context);
    }

    @Query(() => [Product], { name: 'products' })
    findAll(@Args('findProductsInput') findProductsInput: FindProductsInput) {
        return this.productsService.findAll(findProductsInput);
    }

    // @Mutation(() => Product)
    // removeProduct(@Args('id', { type: () => String }) id: string) {
    //     return this.productsService.remove(id);
    // }
}
