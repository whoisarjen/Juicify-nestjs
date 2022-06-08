import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Ctx } from 'src/types/context.type';
import { ConfirmUserInput } from './dto/confirm-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { User } from './entities/user.entity';
import { omit, pick, get } from 'lodash';
import { decode, signJwt } from 'src/utils/jwt.utils';
import { ConfigService } from '@nestjs/config';
import { USER_OMITTED_PROPERTIES } from 'src/utils/user.utils'
import { RequestRefreshPasswordInput } from './dto/request-refresh-password.input';
import { ConfirmRefreshPasswordInput } from './dto/confirm-refresh-password.input';
// import { MailerService } from 'src/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        // private mailerService: MailerService,
        private configService: ConfigService,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async create(createUserInput: CreateUserInput) {
        const confirmation_token = nanoid(this.configService.get('NANOID_SIZE'))

        const user = await this.usersRepository.findOne({
            where: [
                { login: createUserInput.login },
                { email: createUserInput.email },
            ],
        })

        if (user) {
            throw new ForbiddenException('Login or email already in used!')
        }

        const created = await this.usersRepository.create({
            ...createUserInput,
            confirmation_token,
        })

        await this.usersRepository.save(created);

        return created;
    }

    async confirm({ email, confirmation_token }: ConfirmUserInput) {
        const user = await this.usersRepository.findOne({
            where: {
                email,
                confirmation_token,
            }
        })

        if (!user) {
            throw new NotFoundException()
        }

        this.usersRepository.update(user.id, {
            is_confirmed: true,
        })

        return user;
    }

    async login({ login, password }: LoginUserInput, context: Ctx, isRefresh?: boolean) {
        const user = await this.usersRepository.findOne({
            where: {
                login,
            }
        })

        const current_refresh_token = get(context.req, `cookies.${this.configService.get('REFRESH_TOKEN_NAME')}`)
        const session_time = current_refresh_token ? get(await decode(current_refresh_token), ['session_time']) : null

        if (
            !user ||
            (!(await user.comparePassword(password)) && !isRefresh) ||
            (session_time && session_time < user.kill_token_older_than)
        ) {
            await this.logout(context)
            throw new NotFoundException()
        }

        if (!user.is_confirmed) {
            await this.logout(context)
            throw new ForbiddenException('Account is not activated')
        }

        if (user.is_banned) {
            await this.logout(context)
            throw new ForbiddenException('This Account Has Been Suspended')
        }

        const token = signJwt(
            omit(user, USER_OMITTED_PROPERTIES),
            this.configService.get('TOKEN_SETTINGS'),
        )
        const refresh_token = signJwt(
            {
                ...pick(user, ['login']),
                session_time: new Date().getTime(),
            },
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

        user.token = token

        return user
    }

    async logout(context: Ctx) {
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

    async requestRefreshPassword({ email }: RequestRefreshPasswordInput) {
        const user = await this.usersRepository.findOne({
            where: {
                email,
            }
        })

        if (!user) {
            throw new NotFoundException()
        }

        const refresh_password_token = nanoid(32)

        await this.usersRepository.update(user.id, {
            refresh_password_token
        })

        // await this.mailerService.sendMail({
        //     to: user.email,
        //     subject: 'Confirm reset password',
        //     text: refresh_password_token,
        //     html: refresh_password_token,
        // })

        return null
    }

    async confirmRefreshPassword({ email, refresh_password_token }: ConfirmRefreshPasswordInput) {
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
                refresh_password_token: refresh_password_token,
            }
        })

        if (!user) {
            throw new NotFoundException()
        }

        const password = nanoid(32)

        await this.usersRepository.update(user.id, {
            password,
        })

        // await this.mailerService.sendMail({
        //     to: user.email,
        //     subject: 'Your new password',
        //     text: password,
        //     html: password,
        // })

        return null
    }

    async findOneByLogin(login: string, context: Ctx) {
        const user = await this.usersRepository.findOne({
            where: {
                login,
            }
        })

        if (!user) {
            throw new NotFoundException()
        }

        const tokenId = get(context.req.user, 'id')

        if (!user.is_public && user.id !== tokenId) {
            throw new ForbiddenException()
        }

        return user
    }
}
