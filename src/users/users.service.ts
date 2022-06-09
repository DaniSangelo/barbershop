import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as genHash from '../helpers/generateHash.helper';
import { AuthService } from 'src/auth/auth.service';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private connection: Connection,
	) {}

	async create(createUserDto: CreateUserDto) {
		const userExists = await this.findByEmail(createUserDto.email);

		if (userExists) throw new BadRequestException('User already exist');

		const queryRunner = this.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			let user = this.userRepository.create(createUserDto);
			user = await queryRunner.manager.save(user);
			const customer = new Customer();
			customer.user = user;
			await queryRunner.manager.save(customer);
			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
			return error;
		} finally {
			await queryRunner.release();
		}

		return;
	}

	async findAll() {
		return this.userRepository.find({
			select: ['id', 'email'],
		});
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ email });

		return user;
	}

	async findOne(id: number) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new NotFoundException(`User not found`);

		return;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new NotFoundException(`User not found`);

		updateUserDto.password = genHash.generateHashHelper(
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

	async saveToken(userId: number, token: string) {
		await this.userRepository.update(
			{
				id: userId,
			},
			{
				token: token,
			},
		);
		return;
	}

	async refreshToken(oldToken: string) {
		let user = await this.userRepository.findOne({ token: oldToken });

		if (!user) throw new UnauthorizedException('Invalid token');

		return this.authService.login(user);
	}
}
