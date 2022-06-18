import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('sendEmail-queue')
class SendMailConsumer {
	constructor(private mailService: MailerService) {}

	@Process('sendMail-job')
	async sendMailJob(job: Job<any>) {
		//const { data } = job;

		// TODO: remove hardcoded
		await this.mailService.sendMail({
			to: 'shaka.virgem@cz.mail.com',
			from: 'BarberShop <barbershop@mail.com>',
			subject: 'Your time has been scheduled',
			text: 'Hello, Daniel. Your time has been scheduled.',
		});
	}
}

export { SendMailConsumer };
