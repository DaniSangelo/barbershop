import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { BarberModule } from './barber/barber.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(),
		CustomerModule,
		BarberModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
