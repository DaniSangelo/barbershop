import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduledserviceService } from './scheduledservice.service';
import { CreateScheduledserviceDto } from './dto/create-scheduledservice.dto';
import { UpdateScheduledserviceDto } from './dto/update-scheduledservice.dto';

@Controller('scheduledservice')
export class ScheduledserviceController {
  constructor(private readonly scheduledserviceService: ScheduledserviceService) {}

  @Post()
  create(@Body() createScheduledserviceDto: CreateScheduledserviceDto) {
    return this.scheduledserviceService.create(createScheduledserviceDto);
  }

  @Get()
  findAll() {
    return this.scheduledserviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledserviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduledserviceDto: UpdateScheduledserviceDto) {
    return this.scheduledserviceService.update(+id, updateScheduledserviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduledserviceService.remove(+id);
  }
}
