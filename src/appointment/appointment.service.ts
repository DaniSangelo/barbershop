import { MailerService } from '@nestjs-modules/mailer';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BsserviceService } from 'src/bsservice/bsservice.service';
import { Bsservice } from 'src/bsservice/entities/bsservice.entity';
import { Scheduledservice } from 'src/scheduledservice/entities/scheduledservice.entity';
import {
	EntityManager,
	Repository,
	getManager,
	createQueryBuilder,
} from 'typeorm';
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
		private readonly mailService: MailerService,
	) {}

	async create(createAppointmentDto: CreateAppointmentDto) {
		let services: any =
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
					scheduledservice.price = service.price;
					await manager.save(scheduledservice);
				});
				// TODO: remove hardcoded
				await this.mailService.sendMail({
					to: 'shaka.virgem@cz.mail.com',
					from: 'BarberShop <barbershop@mail.com>',
					subject: 'Your time has been scheduled',
					text: 'Hello, Daniel. Your time has been scheduled.',
				});
			} catch (error) {
				throw new BadRequestException(error.message);
			}
		});

		return;
	}

	async findAppointmentsByDate(appointmentDate: string) {
		try {
			const appointmentDetails = await createQueryBuilder(
				'Appointment',
				'a',
			)
				.innerJoinAndSelect('Barber', 'b', 'b.id = a.barberId')
				.innerJoinAndSelect('Customer', 'c', 'a.customerId = c.id')
				.innerJoinAndSelect(
					'Scheduledservice',
					'sc',
					'sc.appointmentId = a.id',
				)
				.innerJoinAndSelect(
					'Bsservice',
					'bs',
					'bs.id = sc.barbershopServiceId',
				)
				.select(
					'b.firstName, b.lastName, b.phoneNumber, a.dtAppointment, a.dtHourAppointment, bs.serviceName, bs.avgDuration as duracao',
				)
				.where('a.dtAppointment = :dtAppointment', {
					dtAppointment: appointmentDate,
				})
				.orderBy('a.dtAppointment, a.dtHourAppointment')
				.getRawMany();
			return appointmentDetails;
		} catch (error) {
			throw new InternalServerErrorException(error.message);
		}
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
			return service as Bsservice;
		}
		return;
	}
}
