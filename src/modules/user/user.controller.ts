import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from 'routing-controllers';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Authorized()
@JsonController('/users/')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto) {
    return this.userService.create(createProfileDto);
  }

  @Get()
  // @HttpCode(HttpStatus.OK)
  async findAll() {
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    // if (limit > 50) {
    //   limit = 50;
    // }
    // return infinityPagination(
    //   await this.userService.findManyWithPagination({
    //     page,
    //     limit,
    //   }),
    //   { page, limit },
    // );
  }

  @Get(':id')
  // @HttpCode(HttpStatus.OK)
  findOne(@Param('id') _id: string) {
    return this.userService.findOne();
  }

  @Patch(':id')
  // @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateUserDto) {
    return this.userService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.softDelete(id);
  }
}
