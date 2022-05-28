import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomer1652483581334 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS Customer (
				nCustomerID INT AUTO_INCREMENT,
				strName VARCHAR(15) NULL,
				strLastName VARCHAR(40) NULL,
				strPhoneNumber CHAR(15) NULL,
				dtBirthDay DATE NULL,
				dtCreatedAt DATETIME NOT NULL DEFAULT NOW(),
				CONSTRAINT PK_Customer_nCustomerID PRIMARY KEY (nCustomerID)
			);`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('Customer');
	}
}
