import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from './update-person.dto';

export class UpdatePersonMe {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({
    description: 'Nome completo da pessoa',
    example: 'João da Silva',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'Nome fantasia, caso aplicável',
    example: 'Empresa XYZ',
    required: false,
  })
  fantasyName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    description: 'Número de telefone principal',
    example: '553199999-9999',
    required: false,
  })
  phone1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    description: 'Número de telefone secundário',
    example: '553198888-8888',
    required: false,
  })
  phone2?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Data de nascimento da pessoa',
    required: false,
  })
  birthDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Anotações ou observações sobre a pessoa',
    example: 'Cliente VIP',
    required: false,
  })
  notes?: string;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  @IsOptional()
  @ApiProperty({
    description: 'Endereço da pessoa',
    type: UpdateAddressDto,
    required: false,
  })
  address?: UpdateAddressDto;
}

export class UpdateMeDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  cpfCnpj?: string;

  @ValidateNested()
  @Type(() => UpdatePersonMe)
  @ApiProperty()
  person: UpdatePersonMe;
}
