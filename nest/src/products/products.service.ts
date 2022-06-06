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
        const products = await this.productsRepository.find({
            where: {
                name: Like(`%${name}%`),
            },
            order: {
                name: "ASC",
                isVerified: "DESC",
            },
            take: 10,
        })

        return products;
        // return await this.productModel.find({
        //     $and:
        //         [
        //             { userid: { $exists: false } },
        //             { deleted: { $exists: false } },
        //             name.split(" ").length > 1
        //                 ? {
        //                     name: {
        //                         $regex: name,
        //                         $options: 'im'
        //                     }
        //                 }
        //                 : {
        //                     $text: {
        //                         $search: name.split(" ").map((str: any) => "\"" + str + "\"").join(' ')
        //                     }
        //                 }
        //         ]
        // })
        //     .sort({ l: 1, v: -1 })
        //     .limit(10)
    }

    // async remove(id: string) {
    //     await this.productModel.deleteOne({ id });
    //     return { id };
    // }
}
