import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { FindProductsInput } from './dto/find-products.input';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async create(createProductInput: CreateProductInput) {
        return await this.productModel.create(createProductInput);
    }

    async findAll({ name }: FindProductsInput) {
        return await this.productModel.find({
            $and:
                [
                    { user_ID: { $exists: false } },
                    { deleted: { $exists: false } },
                    name.split(" ").length > 1
                        ? {
                            name: {
                                $regex: name,
                                $options: 'im'
                            }
                        }
                        : {
                            $text: {
                                $search: name.split(" ").map((str: any) => "\"" + str + "\"").join(' ')
                            }
                        }
                ]
        })
            .sort({ l: 1, v: -1 })
            .limit(10)
    }

    // async remove(_id: string) {
    //     await this.productModel.deleteOne({ _id });
    //     return { _id };
    // }
}
