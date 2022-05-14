import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		let user: User;
		try {
			user = await this.userService.findByEmail(email);
		} catch (error) {
			return null;
		}
		const isPasswordValid = bcrypt.compareSync(password, user.password);
		if (!isPasswordValid) return null;

		return user;
	}

	async login(user: User) {
		const payload = { sub: user.id, email: user.email };
		return {
			token: this.jwtService.sign(payload),
		};
	}
}
