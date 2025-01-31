import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SearchParams } from '../../types/common.types';
import { Response } from 'express';
import { PersonOrderFields, UserOrderFields } from '../../types/user.types';
import { UpdateMeDto } from './dto/update-me.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseSearchParamsPipe } from '../../pipes/parse-search-params/parse-search-params.pipe';
import { CustomInternalErrorException } from '../../exceptions/custom-internal-error.exception';
import { RequirePermission } from '../../decorators/require-permission.decorator';
import { PermissionsGuard } from '../../guards/require-permission.guard';

@ApiTags('User')
@UseGuards(AuthGuard('jwt'))
@UseGuards(PermissionsGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const output = await this.userService.createUser(createUserDto);

      return res.status(HttpStatus.OK).json({
        output,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Get('me')
  async getMe(@CurrentUser() user: User, @Res() res: Response) {
    try {
      const output = await this.userService.findMe(user.id);

      return res.status(HttpStatus.OK).json({
        output,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Get('')
  @RequirePermission('user', 'view')
  async listAllUsers(
    @Query(ParseSearchParamsPipe) params: SearchParams<UserOrderFields>,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.listAllUsers(params);

      return res.status(HttpStatus.OK).json({
        ...data,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.userService.findOneUser(id);

      return res.status(HttpStatus.OK).json({
        output,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Patch(':id')
  async updateUser(
    @Body() data: UpdateUserDto,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const output = await this.userService.updateUser(id, data);

      return res.status(HttpStatus.OK).json({
        output,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Patch('me/update')
  async updateMe(
    @CurrentUser() user: User,
    @Body() data: UpdateMeDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.userService.updateMe(user.id, data);

      return res.status(HttpStatus.OK).json({
        output,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.deleteUser(id);

      return res.status(HttpStatus.OK).json({
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Get('person')
  async listAllPersons(
    @Query(ParseSearchParamsPipe) params: SearchParams<PersonOrderFields>,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.listAllPersons(params);

      return res.status(HttpStatus.OK).json({
        ...data,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }

  @Post('person')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPerson(
    @Body() createPersonDto: CreatePersonDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.userService.createPerson(createPersonDto);

      return res.status(HttpStatus.OK).json({
        output,
        success: true,
      });
    } catch (error) {
      throw new CustomInternalErrorException(error);
    }
  }
}
