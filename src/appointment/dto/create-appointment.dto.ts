export class CreateAppointmentDto {
	customerId: number;
	barberId: number;
	dtAppointment: Date;
	dtHourAppointment: Date;
	dtUpdatedAt?: Date;
	status: number;
}
