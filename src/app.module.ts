import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { BarberModule } from './barber/barber.module';
import { BsserviceModule } from './bsservice/bsservice.module';
import { UserController } from './users/user.controller';
import { UserModule } from './users/user.module';
import { UserService } from './users/users.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(),
		CustomerModule,
		BarberModule,
		BsserviceModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
