import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
    imports: [
        MailerModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UsersResolver, UsersService],
    exports: [UsersService, UsersModule],
})
export class UsersModule {}
