import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { FindProductsInput } from './dto/find-products.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Ctx } from 'src/types/context.type';
import { get } from 'lodash'

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ) { }

    async create(createProductInput: CreateProductInput, context: Ctx) {
        const user = get(context.req.user, 'id')

        const created = await this.productsRepository.create({
            ...createProductInput,
            user,
        })
    
        await this.productsRepository.save(created);

        return await this.productsRepository.findOne({
            where: {
                id: created.id
            },
            relations: {
                user: true,
            },
        });
    }

    async findAll({ name }: FindProductsInput) {
        return await this.productsRepository.find({
            where: {
                name: Like(`%${name}%`),
            },
            order: {
                name: "ASC",
                is_verified: "DESC",
            },
            take: 10,
        })
    }
}
