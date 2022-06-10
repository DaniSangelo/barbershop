import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAppointment1654903217400 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE appointment ADD COLUMN dtFullStartDateTime DATETIME GENERATED ALWAYS AS (CONCAT(dtAppointment,' ', dtHourAppointment)) STORED;`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE appointment DROP COLUMN dtFullStartDateTime`,
		);
	}
}
