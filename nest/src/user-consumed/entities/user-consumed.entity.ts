import { ObjectType, Field } from '@nestjs/graphql';
import { Consumed } from 'src/consumed/entities/consumed.entity';
import { User } from 'src/users/entities/user.entity';
import { JoinColumn } from 'typeorm';

@ObjectType()
export class UserConsumed {
    @Field(() => User, { description: 'Created by' })
    user: User;

    @JoinColumn({ referencedColumnName: 'id', name: 'user' })
    @Field(() => [Consumed], { description: 'Created by' })
    consumed: Consumed[];
}
