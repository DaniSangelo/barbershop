import * as bcrypt from 'bcrypt';

export function generateHash(plainText: string, salt: number) {
	return bcrypt.hashSync(plainText, salt);
};