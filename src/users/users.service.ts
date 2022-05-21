import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as genHash from '../helpers/generateHash.helper';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = this.userRepository.create(createUserDto);
		await this.userRepository.save(user);
		return;
	}

	async findAll() {
		return this.userRepository.find({
			select: ['id', 'email'],
		});
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ email });
		if (!user) throw new NotFoundException();
		return user;
	}

	// see later
	// async findOneOrFail(
	// 	conditions: FindConditions<User>,
	// 	options?: FindOneOptions<User>,
	// ) {
	// 	try {
	// 		return this.userRepository.findOneOrFail(conditions, options);
	// 	} catch (error) {
	// 		throw new NotFoundException(error.message);
	// 	}
	// }

	async findOne(id: number) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new NotFoundException(`User not found`);
		return;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new NotFoundException(`User not found`);
		updateUserDto.updatedAt = this.dtNow();
		updateUserDto.password = genHash.generateHash(
			updateUserDto.password,
			10,
		);
		this.userRepository.merge(user, updateUserDto);
		await this.userRepository.save(user);
		return;
	}

	async remove(id: number) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new NotFoundException(`User not found`);
		user.deletedAt = this.dtNow();
		await this.userRepository.save(user);
		return;
	}

	private dtNow() {
		return new Date();
	}
}
