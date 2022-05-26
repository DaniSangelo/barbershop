import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helpers';
import { RegexHelper } from 'src/helpers/regex.helper';

export class RefreshTokenDto {
	oldToken: string;
}
