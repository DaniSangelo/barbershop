import { Scheduledservice } from 'src/scheduledservice/entities/scheduledservice.entity';

export class CreateAppointmentDto {
	customerId: number;
	barberId: number;
	dtAppointment: Date;
	dtHourAppointment: Date;
	dtUpdatedAt?: Date;
	status: number;
	scheduledServices: Scheduledservice[];
}
