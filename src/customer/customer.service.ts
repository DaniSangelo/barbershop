import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
	) {}

	async create(createCustomerDto: CreateCustomerDto) {
		const customer = this.customerRepository.create(createCustomerDto);
		await this.customerRepository.save(customer);
		return;
	}

	findAll() {
		return this.customerRepository.find();
	}

	async findOne(id: number) {
		const customer = await this.customerRepository.findOne(id);
		if (!customer) throw new NotFoundException(`Customer not found`);
		return customer;
	}

	async update(id: number, updateCustomerDto: UpdateCustomerDto) {
		const customer = await this.customerRepository.preload({
			id,
			...updateCustomerDto,
		});

		if (!customer) throw new NotFoundException(`User not found`);
		await this.customerRepository.save(customer);
		return;
	}

	async remove(id: number) {
		const customer = await this.customerRepository.findOne(id);
		if (!customer) throw new NotFoundException(`User not found`);
		await this.customerRepository.remove(customer);
		return;
	}
}
