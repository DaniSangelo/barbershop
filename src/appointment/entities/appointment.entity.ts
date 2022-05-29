import { Barber } from 'src/barber/entities/barber.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Scheduledservice } from 'src/scheduledservice/entities/scheduledservice.entity';
import internal from 'stream';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
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

	@OneToMany(
		() => Scheduledservice,
		(scheduledService) => scheduledService.appointment,
	)
	scheduledService: Scheduledservice[];

	@BeforeInsert()
	@BeforeUpdate()
	updatedAt() {
		this.dtUpdatedAt = new Date();
	}
}
