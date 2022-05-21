import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AltertableUseraddColumnstrToken1653158623985
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'User',
			new TableColumn({
				name: 'strToken',
				type: 'varchar',
				length: '1000',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('User', 'strToken');
	}
}
