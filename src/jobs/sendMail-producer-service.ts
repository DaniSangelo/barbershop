import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
class SendMailProducerService {
	constructor(@InjectQueue('sendEmail-queue') private queue: Queue) {}

	async sendMail(param) {
		await this.queue.add('sendMail-job', param);
	}
}
export { SendMailProducerService };
