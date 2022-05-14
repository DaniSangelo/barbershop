import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { Barber } from './entities/barber.entity';

@Injectable()
export class BarberService {
	constructor(
		@InjectRepository(Barber)
		private readonly barberRepository: Repository<Barber>,
	) {}

	async create(createBarberDto: CreateBarberDto) {
		const barber = this.barberRepository.create(createBarberDto);
		await this.barberRepository.save(barber);
		return;
	}

	findAll() {
		return this.barberRepository.find();
	}

	async findOne(id: number) {
		const barber = await this.barberRepository.findOne(id);
		if (!barber) throw new NotFoundException(`Barber not found`);
		return barber;
	}

	async update(id: number, updateBarberDto: UpdateBarberDto) {
		const barber = await this.barberRepository.preload({
			id,
			...updateBarberDto,
		});
		if (!barber) throw new NotFoundException(`Barber not found`);
		await this.barberRepository.save(barber);
		return;
	}

	async remove(id: number) {
		const barber = await this.barberRepository.findOne(id);
		if (!barber) throw new NotFoundException(`Barber not found`);
		await this.barberRepository.remove(barber);
		return;
	}
}
