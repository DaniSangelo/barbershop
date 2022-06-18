import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { BarberModule } from './barber/barber.module';
import { BsserviceModule } from './bsservice/bsservice.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ScheduledserviceModule } from './scheduledservice/scheduledservice.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull/dist/bull.module';
import { SendMailProducerService } from './jobs/sendMail-producer-service';
import { SendMailConsumer } from './jobs/sendMail-consumer';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(),
		BullModule.forRoot({
			redis: {
				host: process.env.REDIS_HOST,
				port: +process.env.REDIS_PORT,
			},
		}),
		BullModule.registerQueue({
			name: 'sendEmail-queue',
		}),
		MailerModule.forRoot({
			transport: {
				host: process.env.MAIL_HOST,
				port: +process.env.MAIL_PORT,
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASSWORD,
				},
			},
		}),
		CustomerModule,
		BarberModule,
		BsserviceModule,
		UserModule,
		AuthModule,
		AppointmentModule,
		ScheduledserviceModule,
	],
	controllers: [AppController],
	providers: [SendMailProducerService, AppService, SendMailConsumer],
})
export class AppModule {}
