import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsumedInput } from './dto/create-consumed.input';
import { UpdateConsumedInput } from './dto/update-consumed.input';
import { Consumed } from './entities/consumed.entity';
import { get } from 'lodash'
import { Ctx } from 'src/types/context.type';

@Injectable()
export class ConsumedService {
    constructor(
        @InjectRepository(Consumed)
        private consumedsRepository: Repository<Consumed>
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
                user: true,
                product: true,
            },
        });
    }

    findAll() {
        return `This action returns all consumed`;
    }

    findOne(date: Date) {
        return `This action returns a #${date} consumed`;
    }

    update(id: number, updateConsumedInput: UpdateConsumedInput) {
        return `This action updates a #${id} consumed`;
    }

    remove(id: number) {
        return `This action removes a #${id} consumed`;
    }
}
