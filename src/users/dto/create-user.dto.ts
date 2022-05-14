import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helpers';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
	// @IsNotEmpty()
	// @IsEmail()
	email: string;

	// @IsNotEmpty()
	// @Matches(RegexHelper.password, { message: MessagesHelper.INVALID_PASSWORD })
	password: string;
}
