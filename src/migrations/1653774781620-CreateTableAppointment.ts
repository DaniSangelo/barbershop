import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableAppointment1653774781620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE Appointment (
                nAppointmentID INT AUTO_INCREMENT,
                nCustomerID INT NOT NULL,
                nBarberID INT NOT NULL,
                dtAppointment DATE NOT NULL,
                dtHourAppointment TIME NOT NULL,
                nStatus TINYINT NULL DEFAULT 1,
                dtCreatedAt DATETIME NOT NULL DEFAULT NOW(),
                dtUpdatedAt DATETIME NOT NULL,
                CONSTRAINT PK_Appointment_nAppointmentID PRIMARY KEY (nAppointmentID),
                CONSTRAINT FK_Appointment_Customer_nCustomerID FOREIGN KEY (nCustomerID) REFERENCES Customer (nCustomerID),
                CONSTRAINT FK_Appointment_Barber_nBarberID FOREIGN KEY (nBarberID) REFERENCES Barber (nBarberID)
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE Appointment`)
    }

}
