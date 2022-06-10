import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableBarbershopserviceRenameColumn1654817936760
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE BarbershopService CHANGE dtAvgDuration nAvgDuration TINYINT;`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE BarbershopService CHANGE nAvgDuration dtAvgDuration TIME`,
		);
	}
}
