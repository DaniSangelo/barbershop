import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	name: 'customer',
})
export class Customer {
	@PrimaryGeneratedColumn({ name: 'nCustomerID', type: 'int' })
	id: number;

	@Column({ name: 'strName', type: 'varchar', length: 15 })
	firstName: string;

	@Column({
		name: 'strLastName',
		type: 'varchar',
		length: 40,
		nullable: true,
	})
	lastName: string;

	@Column({
		name: 'strPhoneNumber',
		type: 'varchar',
		length: 15,
		nullable: true,
	})
	phoneNumber: string;

	@Column({ name: 'dtBirthDay', type: 'date', nullable: true })
	birthDay: Date;

	@OneToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'nUserID' })
	user: User;
}
