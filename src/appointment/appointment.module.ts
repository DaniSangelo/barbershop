import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Bsservice } from 'src/bsservice/entities/bsservice.entity';
import { BsserviceService } from 'src/bsservice/bsservice.service';
import { ScheduledserviceService } from 'src/scheduledservice/scheduledservice.service';
import { Scheduledservice } from 'src/scheduledservice/entities/scheduledservice.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Appointment, Bsservice, Scheduledservice]),
	],
	controllers: [AppointmentController],
	providers: [AppointmentService, BsserviceService, ScheduledserviceService],
})
export class AppointmentModule {}
