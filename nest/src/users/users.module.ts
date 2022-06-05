import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        MailerModule,
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UsersResolver, UsersService],
    exports: [UsersService, UsersModule],
})
export class UsersModule {}
