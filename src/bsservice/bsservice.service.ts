import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBsserviceDto } from './dto/create-bsservice.dto';
import { UpdateBsserviceDto } from './dto/update-bsservice.dto';
import { Bsservice } from './entities/bsservice.entity';

@Injectable()
export class BsserviceService {
	constructor(
		@InjectRepository(Bsservice)
		private readonly bsServiceRepository: Repository<Bsservice>,
	) {}

	async create(createBsserviceDto: CreateBsserviceDto) {
		const service = this.bsServiceRepository.create(createBsserviceDto);
		service.updatedAt = new Date();
		await this.bsServiceRepository.save(service);
		return;
	}

	findAll() {
		return this.bsServiceRepository.find();
	}

	findOne(id: number) {
		return this.bsServiceRepository.findOne(id);
	}

	async update(id: number, updateBsserviceDto: UpdateBsserviceDto) {
		const dateNow = new Date();
		const service = await this.bsServiceRepository.preload({
			id,
			updatedAt: dateNow,
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
