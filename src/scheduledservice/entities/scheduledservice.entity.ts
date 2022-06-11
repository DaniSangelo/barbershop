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

	@Column({ name: 'nAppointmentID' })
	appointmentId: number;

	@Column({ name: 'nBarbershopServiceID' })
	barbershopServiceId: number;

	@Column({ name: 'fPrice', type: 'decimal', precision: 5 })
	price: number;
}
