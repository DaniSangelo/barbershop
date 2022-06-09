import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.useGlobalPipes(
	// 	new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
	// );
	app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(3000);
}
bootstrap();
