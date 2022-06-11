import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduledserviceDto } from './dto/create-scheduledservice.dto';
import { UpdateScheduledserviceDto } from './dto/update-scheduledservice.dto';
import { Scheduledservice } from './entities/scheduledservice.entity';

@Injectable()
export class ScheduledserviceService {
	constructor(
		@InjectRepository(Scheduledservice)
		private readonly scheduledServiceRepository: Repository<Scheduledservice>,
	) {}

	async create(createScheduledserviceDto: CreateScheduledserviceDto) {
		return this.scheduledServiceRepository.save(createScheduledserviceDto);
	}

	async remove(id: number) {
		const scheduledService = await this.scheduledServiceRepository.findOne(
			id,
		);
		if (!scheduledService) throw new NotFoundException('Scheduled service not found');

		return this.scheduledServiceRepository.remove(scheduledService);
	}
}
