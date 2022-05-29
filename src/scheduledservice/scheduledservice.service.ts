import { Injectable } from '@nestjs/common';
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

	findAll() {
		return `This action returns all scheduledservice`;
	}

	findOne(id: number) {
		return `This action returns a #${id} scheduledservice`;
	}

	update(id: number, updateScheduledserviceDto: UpdateScheduledserviceDto) {
		return `This action updates a #${id} scheduledservice`;
	}

	remove(id: number) {
		return `This action removes a #${id} scheduledservice`;
	}
}
