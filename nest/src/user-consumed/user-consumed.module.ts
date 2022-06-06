import { Module } from '@nestjs/common';
import { UserConsumedService } from './user-consumed.service';
import { UserConsumedResolver } from './user-consumed.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumed } from 'src/consumed/entities/consumed.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Consumed]),
    ],
    providers: [UserConsumedResolver, UserConsumedService]
})
export class UserConsumedModule {}
