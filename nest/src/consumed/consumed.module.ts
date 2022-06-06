import { Module } from '@nestjs/common';
import { ConsumedService } from './consumed.service';
import { ConsumedResolver } from './consumed.resolver';
import { Consumed } from './entities/consumed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Consumed]),],
    providers: [ConsumedResolver, ConsumedService]
})
export class ConsumedModule {}
