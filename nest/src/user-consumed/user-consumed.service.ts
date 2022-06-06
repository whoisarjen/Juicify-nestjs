import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumed } from 'src/consumed/entities/consumed.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserConsumedService {
    constructor(
        @InjectRepository(Consumed)
        private consumedsRepository: Repository<Consumed>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll() {
        return `This action   s all userConsumed`;
    }

    findOneDay() {
        return {
            user: this.usersRepository.findOne({
                where: {
                    id: 13
                }
            })
        };
    }
}
