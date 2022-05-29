import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Bsservice } from 'src/bsservice/entities/bsservice.entity';

export class CreateScheduledserviceDto {
	appointment: Appointment;
	barbershopService: Bsservice;
	fPrice: number;
}
