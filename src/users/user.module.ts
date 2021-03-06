import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Customer]),
		forwardRef(() => AuthModule),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
