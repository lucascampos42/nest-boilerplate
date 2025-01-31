import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto, CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
