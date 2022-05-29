import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
	constructor(
		@InjectRepository(Appointment)
		private readonly appointmentRepository: Repository<Appointment>,
		private manager: EntityManager,
	) {}

	async create(createAppointmentDto: CreateAppointmentDto) {
		const appointment =
			this.appointmentRepository.create(createAppointmentDto);

		const isAvailable = await this.DateHourIsAvailable(
			appointment.dtAppointment,
			appointment.dtHourAppointment,
			appointment.barberId,
		);

		if (!isAvailable)
			throw new BadRequestException(
				'The chosen date and time are not available',
			);

		console.log(createAppointmentDto);

		return this.appointmentRepository.save(appointment);
	}

	findAll() {
		return `This action returns all appointment`;
	}

	findOne(id: number) {
		return `This action returns a #${id} appointment`;
	}

	update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
		return `This action updates a #${id} appointment`;
	}

	remove(id: number) {
		return `This action removes a #${id} appointment`;
	}

	private async DateHourIsAvailable(
		date: Date,
		hour: Date,
		barberId: number,
	): Promise<boolean> {
		const [qtdAppointments] = await this.manager.query(
			`SELECT
			COUNT(1) AS Qtd
		FROM Appointment
		WHERE nStatus = 1
			AND dtAppointment = ?
			AND dtHourAppointment = ?
			AND nBarberID = ?`,
			[date, hour, barberId],
		);

		return qtdAppointments.Qtd == 0 ? true : false;
	}
}
