import { Module } from '@nestjs/common';
import { DailiesService } from './dailies.service';
import { DailiesResolver } from './dailies.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Daily, DailySchema } from './entities/daily.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Daily.name, schema: DailySchema }]),
    ],
    providers: [DailiesResolver, DailiesService]
})
export class DailiesModule {}
