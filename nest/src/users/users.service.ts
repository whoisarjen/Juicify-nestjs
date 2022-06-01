import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Ctx } from 'src/types/context.type';
import { ConfirmUserInput } from './dto/confirm-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { omit } from 'lodash';
import { signJwt } from 'src/utils/jwt.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService,
    ) {}

    create(createUserInput: CreateUserInput) {
        const confirmationToken = nanoid(32)

        return this.userModel.create({ ...createUserInput, confirmationToken });
    }

    async confirm(confirmUserInput: ConfirmUserInput) {
        const user = await this.userModel.findOneAndUpdate(confirmUserInput, { isConfirmed: true })

        if (!user) {
            throw new NotFoundException()
        }

        return user;
    }

    async login({ login, password }: LoginUserInput, { res }: Ctx) {
        const user = await this.userModel.findOne({ login })

        if (!user || !(await user.comparePassword(password))) {
            throw new NotFoundException()
        }

        if (!user.isConfirmed) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Account is not activated',
            }, HttpStatus.FORBIDDEN);
        }

        if (user.isBanned) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This Account Has Been Suspended',
            }, HttpStatus.FORBIDDEN);
        }

        const token = signJwt(omit(user.toJSON(), ['password', 'isConfirmed']))

        res.cookie('token', token, this.configService.get('COOKIE_OPTIONS'))

        return user
    }

    // findAll() {
    //     return `This action returns all users`;
    // }

    // async findOne(login: string) {
    //     console.log('CUT SOME DATA HERE!')
    //     return await (await this.userModel.findOne({ login })).toJSON();
    // }

    // update(id: number, updateUserInput: UpdateUserInput) {
    //     return `This action updates a #${id} user`;
    // }
}
