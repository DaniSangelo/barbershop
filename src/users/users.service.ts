import {
	forwardRef,
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as genHash from '../helpers/generateHash.helper';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService
	) {}

	async create(createUserDto: CreateUserDto) {
		const userExists = await this.findByEmail(createUserDto.email);

		if (userExists)
			throw new HttpException(
				'User already exist',
				HttpStatus.BAD_REQUEST,
			);

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
		if (user) {
			return this.authService.login(user);
		}
		return new HttpException(
			{
				errormessage: 'Invalid token',
			},
			HttpStatus.UNAUTHORIZED,
		);
	}
}
