import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { BsserviceService } from './bsservice.service';
import { CreateBsserviceDto } from './dto/create-bsservice.dto';
import { UpdateBsserviceDto } from './dto/update-bsservice.dto';

@Controller('bsservice')
export class BsserviceController {
	constructor(private readonly bsserviceService: BsserviceService) {}

	@Post()
	create(@Body() createBsserviceDto: CreateBsserviceDto) {
		return this.bsserviceService.create(createBsserviceDto);
	}

	@Get()
	findAll() {
		return this.bsserviceService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.bsserviceService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateBsserviceDto: UpdateBsserviceDto,
	) {
		return this.bsserviceService.update(+id, updateBsserviceDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.bsserviceService.remove(+id);
	}
}
