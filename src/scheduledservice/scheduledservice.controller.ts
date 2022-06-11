import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ScheduledserviceService } from './scheduledservice.service';
import { CreateScheduledserviceDto } from './dto/create-scheduledservice.dto';
import { UpdateScheduledserviceDto } from './dto/update-scheduledservice.dto';

@Controller('scheduledservice')
export class ScheduledserviceController {
	constructor(
		private readonly scheduledserviceService: ScheduledserviceService,
	) {}

	@Post()
	create(@Body() createScheduledserviceDto: CreateScheduledserviceDto) {
		return this.scheduledserviceService.create(createScheduledserviceDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.scheduledserviceService.remove(+id);
	}
}
