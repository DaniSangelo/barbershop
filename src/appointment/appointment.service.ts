import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BsserviceService } from 'src/bsservice/bsservice.service';
import { Bsservice } from 'src/bsservice/entities/bsservice.entity';
import { CreateScheduledserviceDto } from 'src/scheduledservice/dto/create-scheduledservice.dto';
import { Scheduledservice } from 'src/scheduledservice/entities/scheduledservice.entity';
import { ScheduledserviceService } from 'src/scheduledservice/scheduledservice.service';
import { Connection, EntityManager, Repository } from 'typeorm';
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
		private readonly scheduledservice: ScheduledserviceService,
	) {}

	async create(createAppointmentDto: CreateAppointmentDto) {
		let appointment =
			this.appointmentRepository.create(createAppointmentDto);

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

		appointment = await this.appointmentRepository.save(appointment);

		services.forEach(async (service) => {
			let scheduledservice = new Scheduledservice();
			scheduledservice.appointment = appointment;
			scheduledservice.barbershopService = service;
			scheduledservice.fPrice = service.price;

			await this.scheduledservice.create(scheduledservice);
		});
		return;
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
