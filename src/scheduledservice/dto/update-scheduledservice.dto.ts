import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduledserviceDto } from './create-scheduledservice.dto';

export class UpdateScheduledserviceDto extends PartialType(CreateScheduledserviceDto) {}
