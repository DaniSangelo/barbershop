import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Bsservice } from 'src/bsservice/entities/bsservice.entity';
import { BsserviceService } from 'src/bsservice/bsservice.service';
import { ScheduledserviceService } from 'src/scheduledservice/scheduledservice.service';
import { Scheduledservice } from 'src/scheduledservice/entities/scheduledservice.entity';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [
		TypeOrmModule.forFeature([Appointment, Bsservice, Scheduledservice]),
		BullModule.registerQueue({
			name: 'sendEmail-queue',
		}),
	],
	controllers: [AppointmentController],
	providers: [
		AppointmentService,
		BsserviceService,
		ScheduledserviceService,
		SendMailProducerService,
	],
})
export class AppointmentModule {}
