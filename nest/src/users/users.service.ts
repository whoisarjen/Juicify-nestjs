import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Ctx } from 'src/types/context.type';
import { ConfirmUserInput } from './dto/confirm-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { User, UserDocument } from './entities/user.entity';
import { omit, pick } from 'lodash';
import { signJwt } from 'src/utils/jwt.utils';
import { ConfigService } from '@nestjs/config';
import { USER_OMITTED_PROPERTIES } from 'src/utils/user.utils'
import { RequestRefreshPasswordInput } from './dto/request-refresh-password.input';
import { ConfirmRefreshPasswordInput } from './dto/confirm-refresh-password.input';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private mailerService: MailerService,
        private configService: ConfigService,
    ) {}

    create(createUserInput: CreateUserInput) {
        const confirmationToken = nanoid(32)

        return this.userModel.create({
            ...createUserInput,
            confirmationToken,
        });
    }

    async confirm(confirmUserInput: ConfirmUserInput) {
        const user = await this.userModel.findOneAndUpdate(confirmUserInput, { isConfirmed: true })

        if (!user) {
            throw new NotFoundException()
        }

        return user;
    }

    async login({ login, password }: LoginUserInput, context: Ctx, isRefresh?: boolean) {
        const user = await this.userModel.findOne({ login })

        if (!user || (!(await user.comparePassword(password)) && !isRefresh)) {
            throw new NotFoundException()
        }

        if (!user.isConfirmed) {
            this.logout(context)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Account is not activated',
            }, HttpStatus.FORBIDDEN);
        }

        if (user.isBanned) {
            this.logout(context)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This Account Has Been Suspended',
            }, HttpStatus.FORBIDDEN);
        }

        const token = signJwt(
            omit(user.toJSON(), USER_OMITTED_PROPERTIES),
            this.configService.get('TOKEN_SETTINGS'),
        )
        const refresh_token = signJwt(
            pick(user.toJSON(), ['login']),
            this.configService.get('REFRESH_TOKEN_SETTINGS'),
        )

        context.res.cookie(
            this.configService.get('TOKEN_NAME'),
            token,
            this.configService.get('COOKIE_OPTIONS'),
        )
        context.res.cookie(
            this.configService.get('REFRESH_TOKEN_NAME'),
            refresh_token,
            this.configService.get('COOKIE_OPTIONS'),
        )

        return user
    }

    logout(context: Ctx) {
        context.res.cookie(
            this.configService.get('TOKEN_NAME'),
            '',
            {
                ...this.configService.get('COOKIE_OPTIONS'),
                maxAge: 0,
            },
        )
        context.res.cookie(
            this.configService.get('REFRESH_TOKEN_NAME'),
            '',
            {
                ...this.configService.get('COOKIE_OPTIONS'),
                maxAge: 0,
            },
        )
        return null
    }

    async requestRefreshPassword(requestRefreshPasswordInput: RequestRefreshPasswordInput) {
        const user = await this.userModel.findOne(requestRefreshPasswordInput)

        if (!user) {
            throw new NotFoundException()
        }

        const refreshPasswordToken = nanoid(32)

        await user.update({ refreshPasswordToken })

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Confirm reset password',
            text: refreshPasswordToken,
            html: refreshPasswordToken,
        })

        return null
    }

    async confirmRefreshPassword(confirmRefreshPasswordInput: ConfirmRefreshPasswordInput) {
        const user = await this.userModel.findOne(confirmRefreshPasswordInput)

        if (!user) {
            throw new NotFoundException()
        }

        const password = nanoid(32)

        user.password = password
        await user.save()

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Your new password',
            text: password,
            html: password,
        })

        return null
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
