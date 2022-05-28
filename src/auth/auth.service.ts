import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		let user: User;

		user = await this.userService.findByEmail(email);
		if (!user) throw new NotFoundException('User not found');

		const isPasswordValid = bcrypt.compareSync(password, user.password);
		if (!isPasswordValid) return null;

		return user;
	}

	async login(user: User) {
		const payload = { sub: user.id, email: user.email };
		const token = this.jwtService.sign(payload);
		await this.userService.saveToken(user.id, token);
		return {
			token: token,
		};
	}
}
