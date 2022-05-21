import { IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helpers';
import { RegexHelper } from 'src/helpers/regex.helper';

export class UpdateUserDto {
	// @IsNotEmpty()
	// @Matches(RegexHelper.password, { message: MessagesHelper.INVALID_PASSWORD })
	password?: string;
	updatedAt?: Date;
}
