import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	name: 'Barber',
})
export class Barber {
	@PrimaryGeneratedColumn({ name: 'nBarberID', type: 'int' })
	id: number;

	@Column({ name: 'strFirstName', type: 'varchar', length: '15' })
	firstName: string;

	@Column({ name: 'strLastName', type: 'varchar', length: '40' })
	lastName: string;

	@Column({ name: 'strPhoneNumber', type: 'varchar', length: '15' })
	phoneNumber: string;

	@Column({ name: 'bIsActive', type: 'tinyint' })
	isActive: boolean;
}
