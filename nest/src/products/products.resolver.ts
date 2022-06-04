import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { FindProductsInput } from './dto/find-products.input';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Mutation(() => Product)
    async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
        return await this.productsService.create(createProductInput);
    }

    @Query(() => [Product], { name: 'products' })
    findAll(@Args('findProductsInput') findProductsInput: FindProductsInput) {
        return this.productsService.findAll(findProductsInput);
    }

    // @Mutation(() => Product)
    // removeProduct(@Args('_id', { type: () => String }) _id: string) {
    //     return this.productsService.remove(_id);
    // }
}
