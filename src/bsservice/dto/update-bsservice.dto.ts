import { PartialType } from '@nestjs/mapped-types';
import { CreateBsserviceDto } from './create-bsservice.dto';

export class UpdateBsserviceDto extends PartialType(CreateBsserviceDto) {}
