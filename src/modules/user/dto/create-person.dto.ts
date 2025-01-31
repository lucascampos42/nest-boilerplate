import {
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'Nome da rua',
    example: 'Rua das Flores',
  })
  street: string;

  @IsString()
  @MaxLength(10)
  @ApiProperty({
    description: 'Número da residência',
    example: '123',
  })
  number: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'Nome do bairro',
    example: 'Centro',
  })
  neighborhood: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'Nome da cidade',
    example: 'São Paulo',
  })
  city: string;

  @IsString()
  @MaxLength(2)
  @ApiProperty({
    description: 'Código do estado',
    example: 'SP',
  })
  state: string;

  @IsString()
  @MaxLength(10)
  @ApiProperty({
    description: 'Código postal (CEP)',
    example: '12345-678',
  })
  zipCode: string;
}

export class CreatePersonDto {
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
  @MaxLength(14)
  @ApiProperty({
    description: 'CPF ou CNPJ da pessoa',
    example: '12345678900',
    required: false,
  })
  cpfCnpj?: string;

  @IsEmail()
  @ApiProperty({
    description: 'Endereço de email válido',
    example: 'joao.silva@email.com',
  })
  email: string;

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
}
