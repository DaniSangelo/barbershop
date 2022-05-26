import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDto } from 'src/users/dto/refresh-token.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}

	@Put('refresh-token')
	async refresh(@Body() data: RefreshTokenDto) {
		let token = await this.userService.refreshToken(data.oldToken);
		return token;
	}
}
