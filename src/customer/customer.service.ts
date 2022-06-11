import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
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

	async findAll() {
		const customers = await createQueryBuilder('Customer', 'c')
			.innerJoinAndSelect('User', 'u', 'c.userId = u.id')
			.select(
				'c.id, c.firstName, c.lastName, c.birthDay, c.phoneNumber, u.id AS user, u.email',
			)
			.getRawMany();
		return customers;
	}

	async findOne(id: number) {
		const customer = await createQueryBuilder('Customer', 'c')
			.innerJoinAndSelect('User', 'u', 'c.userId = u.id')
			.select(
				'c.id, c.firstName, c.lastName, c.birthDay, c.phoneNumber, u.id AS user, u.email',
			)
			.where('c.id = :id', { id: id })
			.getRawOne();
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
		const customer = await this.findOne(id);
		if (!customer) throw new NotFoundException(`User not found`);
		await this.customerRepository.remove(customer);
		return;
	}
}
