import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, QueryBuilder, Repository } from 'typeorm';
import { CreateBsserviceDto } from './dto/create-bsservice.dto';
import { UpdateBsserviceDto } from './dto/update-bsservice.dto';
import { Bsservice } from './entities/bsservice.entity';
import { dateNowHelper } from 'src/helpers/utils.helper';
import { createQuery } from 'mysql2/typings/mysql/lib/Connection';

@Injectable()
export class BsserviceService {
	constructor(
		@InjectRepository(Bsservice)
		private readonly bsServiceRepository: Repository<Bsservice>,
	) {}

	async create(createBsserviceDto: CreateBsserviceDto) {
		const service = this.bsServiceRepository.create(createBsserviceDto);
		service.updatedAt = dateNowHelper.now;
		await this.bsServiceRepository.save(service);
		return;
	}

	async findAll() {
		try {
			const bsService = await createQueryBuilder('Bsservice', 'bs')
				.select(
					'bs.id, bs.serviceName, bs.serviceDescription, bs.price, bs.avgDuration',
				)
				.cache('services', 60000)
				.getRawMany();
			return bsService;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findOne(id: number) {
		// usar o querybuilder estava fazendo com que as propriedades do serviço lá no appointment.service
		// ficassem como undefined e, portanto, quebrando a aplicação.
		// colocar um console.log em services.reduce em appointment.service.ts
		// const bsService = await createQueryBuilder('Bsservice', 'bs')
		// 	.select(
		// 		'bs.id, bs.serviceName, bs.serviceDescription, bs.price, bs.avgDuration',
		// 	)
		// 	.where('bs.id = :id', { id: id })
		// 	.getRawOne();
		const bsService = await this.bsServiceRepository.findOne(id);
		return bsService;
	}

	async update(id: number, updateBsserviceDto: UpdateBsserviceDto) {
		const service = await this.bsServiceRepository.preload({
			id,
			updatedAt: dateNowHelper.now,
			...updateBsserviceDto,
		});

		if (!service)
			throw new NotFoundException(`Barbershop service not found`);

		await this.bsServiceRepository.save(service);
		return;
	}

	async remove(id: number) {
		const service = await this.findOne(id);
		if (!service)
			throw new NotFoundException(`Barbershop service not found`);

		await this.bsServiceRepository.remove(service);
		return;
	}
}
