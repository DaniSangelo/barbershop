import * as bcrypt from 'bcrypt';

export function generateHashHelper(plainText: string, salt: number) {
	return bcrypt.hashSync(plainText, salt);
};