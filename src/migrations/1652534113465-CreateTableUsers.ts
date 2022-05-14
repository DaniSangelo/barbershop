import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1652534113465 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE User (
				nUserID INT AUTO_INCREMENT,
				strEmail VARCHAR(50) NOT NULL,
				strPassword VARCHAR(1000) NOT NULL,
				dtCreatedAt DATETIME NOT NULL DEFAULT NOW(),
				dtUpdatedAt DATETIME NULL,
				dtDeletedAt DATETIME NULL,
				CONSTRAINT PK_User_nUserID PRIMARY KEY (nUserID)
			)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE User`);
	}
}
