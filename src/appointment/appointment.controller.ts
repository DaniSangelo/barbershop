import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
	constructor(private readonly appointmentService: AppointmentService) {}

	@Post()
	create(@Body() createAppointmentDto: CreateAppointmentDto) {
		return this.appointmentService.create(createAppointmentDto);
	}

	@Get(':appointmentDate')
	findAppointmentsByDate(@Param('appointmentDate') appointmentDate: string) {
		return this.appointmentService.findAppointmentsByDate(appointmentDate);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateAppointmentDto: UpdateAppointmentDto,
	) {
		return this.appointmentService.update(+id, updateAppointmentDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.appointmentService.remove(+id);
	}
}
