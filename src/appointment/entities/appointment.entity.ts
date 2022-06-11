import { Barber } from 'src/barber/entities/barber.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Appointment' })
export class Appointment {
	@PrimaryGeneratedColumn({ name: 'nAppointmentID', type: 'int' })
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.appointments)
	@JoinColumn({ name: 'nCustomerID' })
	customer: Customer;

	@ManyToOne(() => Barber, (barber) => barber.appointments)
	@JoinColumn({ name: 'nBarberID' })
	barber: Barber;

	@Column({ name: 'nCustomerID', type: 'int' })
	customerId: number;

	@Column({ name: 'nBarberID', type: 'int' })
	barberId: number;

	@Column({ name: 'dtAppointment', type: 'date' })
	dtAppointment: Date;

	@Column({ name: 'dtHourAppointment', type: 'time' })
	dtHourAppointment: Date;

	@Column({ name: 'nStatus', type: 'tinyint' })
	status: number;

	@Column({ name: 'dtCreatedAt', type: 'datetime' })
	dtCreatedAt: Date;

	@Column({ name: 'dtUpdatedAt', type: 'datetime' })
	dtUpdatedAt: Date;

	@BeforeInsert()
	@BeforeUpdate()
	updatedAt() {
		this.dtUpdatedAt = new Date();
	}
}
