import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBarber1652485692166 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'Barber',
				columns: [
					{
						name: 'nBarberID',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'strFirstName',
						type: 'varchar',
						length: '15',
						isNullable: false,
					},
					{
						name: 'strLastName',
						type: 'varchar',
						length: '40',
						isNullable: true,
					},
					{
						name: 'strPhoneNumber',
						type: 'varchar',
						length: '15',
						isNullable: true,
					},
					{
						name: 'bIsActive',
						type: 'tinyint',
						isNullable: false,
						default: '1',
					},
					{
						name: 'dtCreatedAt',
						type: 'datetime',
						isNullable: false,
						default: 'NOW()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('Barber');
	}
}
