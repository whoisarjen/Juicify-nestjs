import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumed } from 'src/consumed/entities/consumed.entity';
import { Ctx } from 'src/types/context.type';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { FindUserConsumedInput } from './dto/find-user-consumed';

@Injectable()
export class UserConsumedService {
    constructor(
        @InjectRepository(Consumed)
        private consumedsRepository: Repository<Consumed>,
        private usersService: UsersService,
    ) { }

    findAll() {
        return `This action   s all userConsumed`;
    }

    async findOneDay({ login, date }: FindUserConsumedInput, context: Ctx) {
        const user = await this.usersService.findOneByLogin(login, context)

        const consumed = await this.consumedsRepository.find({
            where: {
                date,
                user: user.id as any,
            },
            relations: {
                product: true,
            },
        })

        return {
            user,
            consumed,
        };
    }
}
