import { Injectable } from '@nestjs/common';
import { MailerService as NestMailer } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
	constructor(
		private readonly mailerService: NestMailer,
        private configService: ConfigService,
	) {}

	async sendMail(mail: { to: string, subject: string, text: string, html: string }) {
		return await this.mailerService
			.sendMail({
				...mail,
				from: this.configService.get('MAILER_SENDER'),
			})
	}
}
