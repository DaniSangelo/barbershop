import { MigrationInterface, QueryResult, QueryRunner, TableColumn } from 'typeorm';

export class AltertableCustomerAddColumnnUserID1653746977194
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'Customer',
			new TableColumn({
				name: 'nUserID',
				type: 'int',
				isNullable: true,
			})
		);

		await queryRunner.query(
			`ALTER TABLE Customer ADD CONSTRAINT FK_Customer_User_nUserID FOREIGN KEY (nUserID)
		REFERENCES User (nUserID)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE Customer DROP CONSTRAINT FK_Customer_User_nUserID`,
		);

		await queryRunner.dropColumn('Customer', 'nUserID');
	}
}
