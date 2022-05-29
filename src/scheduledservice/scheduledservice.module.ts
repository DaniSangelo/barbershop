import { Module } from '@nestjs/common';
import { ScheduledserviceService } from './scheduledservice.service';
import { ScheduledserviceController } from './scheduledservice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scheduledservice } from './entities/scheduledservice.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Scheduledservice])],
	controllers: [ScheduledserviceController],
	providers: [ScheduledserviceService],
	exports: [ScheduledserviceService],
})
export class ScheduledserviceModule {}
