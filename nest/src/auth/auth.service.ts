import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(login: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(login);
		if (user && await user.comparePassword(password)) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login({ login, password }: { login: string, password: string }) {
		const user = await this.validateUser(login, password)
		if (!user) {
			throw new NotFoundException()
		}
		return {
			access_token: this.jwtService.sign(user),
		};
	}
}