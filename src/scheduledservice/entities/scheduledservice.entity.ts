import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Bsservice } from 'src/bsservice/entities/bsservice.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
	name: 'Scheduledservice',
})
export class Scheduledservice {
	@PrimaryGeneratedColumn({ name: 'nScheduledServiceID', type: 'int' })
	id: number;

	@ManyToOne(
		() => Appointment,
		(appointment) => appointment.scheduledService,
		{ cascade: true },
	)
	@JoinColumn({ name: 'nAppointmentID' })
	appointment: Appointment;

	@ManyToOne(() => Bsservice, (bsservice) => bsservice.scheduledService)
	@JoinColumn({ name: 'nBarbershopServiceID' })
	barbershopService: Bsservice;

	@Column({ name: 'fPrice', type: 'decimal', precision: 5 })
	fPrice: number;
}
