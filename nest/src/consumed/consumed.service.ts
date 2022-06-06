import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsumedInput } from './dto/create-consumed.input';
import { UpdateConsumedInput } from './dto/update-consumed.input';
import { Consumed } from './entities/consumed.entity';
import { get } from 'lodash'
import { Ctx } from 'src/types/context.type';
import { FindConsumedInput } from './dto/find-consumed.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ConsumedService {
    constructor(
        @InjectRepository(Consumed)
        private consumedsRepository: Repository<Consumed>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
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

    async findOneDay({ login, date }: FindConsumedInput, context: Ctx) {
        const user = get(context.req.user, 'id')

        const { id, is_public } = await this.usersRepository.findOne({
            where: {
                login,
            }
        })

        if (!user) {
            throw new NotFoundException()
        }

        if (!is_public && id !== user.id) {
            throw new ForbiddenException()
        }

        const test = await this.consumedsRepository.find({
            where: {
                date,
                user: id as any,
            },
            relations: {
                user: true,
                product: true,
            },
        })

        console.log(test)

        return test;
    }

    update(id: number, updateConsumedInput: UpdateConsumedInput) {
        return `This action updates a #${id} consumed`;
    }

    remove(id: number) {
        return `This action removes a #${id} consumed`;
    }
}
