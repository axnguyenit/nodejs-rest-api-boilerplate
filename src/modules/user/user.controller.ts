import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
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

import { UserService } from './';
import { CreateUserDto, UpdateUserDto } from './dto';

@Authorized()
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
  async filteredUser(
    @QueryParam('limit', { required: true }) limit: number,
    @QueryParam('page', { required: true }) page: number,
    @QueryParam('query') query: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return await this.userService.getFilteredUsers(
      {
        page,
        limit,
      },
      query,
    );
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.OK)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.softDelete(id);
  }
}
