import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsumedInput } from './dto/create-consumed.input';
import { UpdateConsumedInput } from './dto/update-consumed.input';
import { Consumed } from './entities/consumed.entity';
import { get } from 'lodash'
import { Ctx } from 'src/types/context.type';
import { FindConsumedInput } from './dto/find-consumed.input';

@Injectable()
export class ConsumedService {
    constructor(
        @InjectRepository(Consumed)
        private consumedsRepository: Repository<Consumed>,
    ) { }

    async create(createConsumedInput: CreateConsumedInput, context: Ctx) {
        const user = get(context.req.user, 'id')

        const created = await this.consumedsRepository.create({
            ...createConsumedInput,
            user,
        })

        await this.consumedsRepository.save(created)

        return await this.consumedsRepository.findOne({
            where: {
                id: created.id
            },
            relations: {
                product: true,
            },
        });
    }

    // async findOneDay({ login, date }: FindConsumedInput, context: Ctx) {
    //     const tokenId = get(context.req.user, 'id')

    //     const user = await this.usersRepository.findOne({
    //         where: {
    //             login,
    //         }
    //     })

    //     if (!user) {
    //         throw new NotFoundException()
    //     }

    //     if (!user.is_public && user.id !== tokenId) {
    //         throw new ForbiddenException()
    //     }

    //     const consumedPerDay = await this.consumedsRepository.find({
    //         where: {
    //             date,
    //             user: user.id as any,
    //         },
    //         relations: {
    //             product: true,
    //         },
    //     })

    //     return {
    //         user,
    //         consumedPerDay,
    //     };
    // }
    
    async findOneDay({ id, date }: FindConsumedInput) {
        const consumedPerDay = await this.consumedsRepository
            .createQueryBuilder('consumed')
            .where('consumed.user = :id', { id })
            .andWhere("consumed.date = :date", { date })
            .leftJoinAndSelect('consumed.product', 'product')
            .getMany()
        // .find({
        //     where: {
        //         date,
        //         user: id,
        //     },
        //     relations: {
        //         product: true,
        //     },
        // })

        console.log(consumedPerDay)

        return consumedPerDay
    }

    update(id: number, updateConsumedInput: UpdateConsumedInput) {
        return `This action updates a #${id} consumed`;
    }

    remove(id: number) {
        return `This action removes a #${id} consumed`;
    }
}
