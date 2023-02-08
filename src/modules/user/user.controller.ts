import { StatusCodes } from 'http-status-codes';
import {
  // Authorized,
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParam,
} from 'routing-controllers';

import { infinityPagination } from '../../utils';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
// @Authorized()
@JsonController('/users/')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createProfileDto: CreateUserDto) {
    return this.userService.create(createProfileDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll(
    @QueryParam('limit', { required: true }) limit: number,
    @QueryParam('page', { required: true }) page: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.userService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.OK)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateUserDto) {
    return this.userService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
