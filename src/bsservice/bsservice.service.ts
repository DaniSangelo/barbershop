import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateBsserviceDto } from './dto/create-bsservice.dto';
import { UpdateBsserviceDto } from './dto/update-bsservice.dto';
import { Bsservice } from './entities/bsservice.entity';
import { dateNowHelper } from 'src/helpers/utils.helper';

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
				'bs.serviceName, bs.serviceDescription, bs.price, bs.avgDuration',
				)
				.cache('services', 60000)
				.getRawMany();
			return bsService;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	findOne(id: number) {
		return this.bsServiceRepository.findOne(id);
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
		const service = await this.bsServiceRepository.findOne(id);
		if (!service)
			throw new NotFoundException(`Barbershop service not found`);

		await this.bsServiceRepository.remove(service);
		return;
	}
}
