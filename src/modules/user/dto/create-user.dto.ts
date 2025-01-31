import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Endereço de email válido do usuário.',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Nome de usuário único.',
    example: 'johndoe',
  })
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'CPF ou CNPJ do usuário. Este campo é opcional.',
    example: '12345678900',
    required: false,
  })
  cpfCnpj?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/.*/, {
    message: 'senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário. Deve ter entre 3 e 20 caracteres.',
    example: 'SenhaForte123',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'ID opcional do parceiro associado ao usuário.',
    example: 'ABC',
    required: false,
  })
  partnerId?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'ID do canil associado ao usuário, se aplicável.',
    example: 1,
    required: false,
  })
  kennelId?: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Indica se o usuário está ativo',
    example: true,
    required: true,
  })
  isActive: boolean;
}
