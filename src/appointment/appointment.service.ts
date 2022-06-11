import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BsserviceService } from 'src/bsservice/bsservice.service';
import { Bsservice } from 'src/bsservice/entities/bsservice.entity';
import { CreateScheduledserviceDto } from 'src/scheduledservice/dto/create-scheduledservice.dto';
import { Scheduledservice } from 'src/scheduledservice/entities/scheduledservice.entity';
import { ScheduledserviceService } from 'src/scheduledservice/scheduledservice.service';
import { getConnection, EntityManager, Repository, getManager } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
	constructor(
		@InjectRepository(Appointment)
		private readonly appointmentRepository: Repository<Appointment>,
		private manager: EntityManager,
		private readonly bsService: BsserviceService,
	) {}

	async create(createAppointmentDto: CreateAppointmentDto) {
		let services =
			createAppointmentDto.scheduledServices &&
			(await Promise.all(
				createAppointmentDto.scheduledServices.map((service) =>
					this.preloadBarberServiceById(service.id),
				),
			));

		let totalDuration = services.reduce((acc, service) => {
			return acc + service.avgDuration;
		}, 0);

		let appointment =
			this.appointmentRepository.create(createAppointmentDto);

		const isAvailable = await this.DateHourIsAvailable(
			totalDuration,
			appointment.dtAppointment,
			appointment.dtHourAppointment,
			appointment.barberId,
		);

		if (!isAvailable)
			throw new BadRequestException(
				'The chosen date and time are not available',
			);

		await getManager().transaction(async (manager) => {
			try {
				appointment = await manager.save(appointment);

				const appointmentId = appointment.id;

				services.forEach(async (service) => {
					let scheduledservice = new Scheduledservice();
					scheduledservice.appointmentId = appointmentId;
					scheduledservice.barbershopServiceId = service.id;
					scheduledservice.fPrice = service.price;
					await manager.save(scheduledservice);
				});
			} catch (error) {
				throw new BadRequestException(error.message);
			}
		});

		return;
	}

	async findAppointmentsByDate(appointmentDate: string) {
		return this.appointmentRepository.find({
			where: {
				dtAppointment: appointmentDate,
			},
		});
	}

	update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
		return `This action updates a #${id} appointment`;
	}

	remove(id: number) {
		return `This action removes a #${id} appointment`;
	}

	private async DateHourIsAvailable(
		totalDuration: number,
		date: Date,
		hour: Date,
		barberId: number,
	): Promise<boolean> {
		const [qtdAppointments] = await this.manager.query(
			`SELECT
			DateHourIsAvailable
			(
				?,
				?,
				?,
				?
			) as IsAvailable;`,
			[totalDuration, date, hour, barberId],
		);

		return qtdAppointments.IsAvailable == 0 ? true : false;
	}

	private async preloadBarberServiceById(id: number): Promise<Bsservice> {
		const service = await this.bsService.findOne(id);

		if (service) {
			return service;
		}
		return;
	}
}
