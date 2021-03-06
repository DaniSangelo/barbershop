import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	name: 'BarbershopService',
})
export class Bsservice {
	@PrimaryGeneratedColumn({ name: 'nBarbershopServiceID', type: 'int' })
	id: number;

	@Column({ name: 'strName', type: 'varchar', length: '40' })
	serviceName: string;

	@Column({ name: 'strDescription', type: 'varchar', length: '500' })
	serviceDescription: string;

	@Column({ name: 'fPrice', type: 'decimal', precision: 5 })
	price: number;

	@Column({ name: 'nAvgDuration', type: 'tinyint' })
	avgDuration: number;

	@Column({ name: 'bIsActive', type: 'tinyint' })
	isActive: boolean;

	@Column({ name: 'dtUpdatedAt', type: 'datetime' })
	updatedAt: Date;
}
