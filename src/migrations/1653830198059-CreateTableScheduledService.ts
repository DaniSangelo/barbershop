import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableScheduledService1653830198059 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE ScheduledService (
				nScheduledServiceID INT AUTO_INCREMENT,
				nAppointmentID INT NOT NULL,
				nBarbershopServiceID INT NOT NULL,
				fPrice DECIMAL(5,2) NOT NULL,
				CONSTRAINT PK_ScheduledService_nScheduledServiceID PRIMARY KEY (nScheduledServiceID),
				CONSTRAINT FK_ScheduledService_Appointment_nAppointmentID FOREIGN KEY (nAppointmentID) REFERENCES Appointment (nAppointmentID),
				CONSTRAINT FK_ScheduledService_Service_nBarbershopServiceID FOREIGN KEY (nBarbershopServiceID) REFERENCES BarbershopService (nBarbershopServiceID)
			)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE ScheduledService`);
	}

}
