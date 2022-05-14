import {
	BeforeInsert,
	Column,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({
	name: 'User',
})
export class User {
	@PrimaryGeneratedColumn({ name: 'nUserID', type: 'int' })
	id: number;

	@Column({ name: 'strEmail', type: 'varchar', length: '50' })
	email: string;

	@Column({ name: 'strPassword', type: 'varchar', length: '1000' })
	password: string;

	@Column({ name: 'dtCreatedAt', type: 'datetime' })
	createdAt: Date;

	@Column({ name: 'dtUpdatedAt', type: 'datetime' })
	updatedAt: Date;

	@Column({ name: 'dtDeletedAt', type: 'datetime' })
	deletedAt: Date;

	@BeforeInsert()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
