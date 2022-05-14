import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth/login')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post()
	async login(@Req() req) {
		return this.authService.login(req.user);
	}
}
