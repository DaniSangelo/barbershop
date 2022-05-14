import { Module } from '@nestjs/common';
import { BsserviceService } from './bsservice.service';
import { BsserviceController } from './bsservice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bsservice } from './entities/bsservice.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Bsservice])],
	controllers: [BsserviceController],
	providers: [BsserviceService],
})
export class BsserviceModule {}
