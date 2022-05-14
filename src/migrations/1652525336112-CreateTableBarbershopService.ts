import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBarbershopService1652525336112
	implements MigrationInterface
{
	// CREATE TABLE `BarbershopService` (
	// 	nBarbershopServiceID INT AUTO_INCREMENT,
	// 	strName VARCHAR(40) NOT NULL,
	// 	strDescription VARCHAR(500) NULL,
	// 	fPrice DECIMAL(5, 2) NOT NULL,
	// 	dtAvgDuration TIME NULL,
	// 	bIsActive TINYINT NOT NULL DEFAULT 1,
	// 	dtCreatedAt DATETIME NOT NULL DEFAULT NOW(),
	// 	dtUpdatedAt DATETIME NOT NULL,
	// 	CONSTRAINT PK_Service_nBarbershopServiceID PRIMARY KEY (nBarbershopServiceID)
	// );
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'BarbershopService',
				columns: [
					{
						name: 'nBarbershopServiceID',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'strName',
						type: 'varchar',
						length: '40',
						isNullable: false,
					},
					{
						name: 'strDescription',
						type: 'varchar',
						length: '500',
						isNullable: true,
					},
					{
						name: 'fPrice',
						type: 'decimal(5,2)',
						isNullable: false,
					},
					{
						name: 'dtAvgDuration',
						type: 'time',
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
					{
						name: 'dtUpdatedAt',
						type: 'datetime',
						isNullable: true,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('BarbershopService');
	}
}
