import { Service } from 'typedi';

import type { CreateUserDto, UpdateUserDto } from './dto';

@Service()
export class UserService {
  constructor() {}

  create(_createProfileDto: CreateUserDto) {
    // return this.userRepository.save(
    //   this.userRepository.create(createProfileDto),
    // );
  }

  // findManyWithPagination(paginationOptions: IPaginationOptions) {
  //   return this.userRepository.find({
  //     skip: (paginationOptions.page - 1) * paginationOptions.limit,
  //     take: paginationOptions.limit,
  //   });
  // }

  findOne() {
    // return this.userRepository.findOneOrFail({
    //   where: fields,
    // });
  }

  update(_id: string, _updateProfileDto: UpdateUserDto) {
    // return this.userRepository.save(
    //   this.userRepository.create({
    //     id,
    //     ...updateProfileDto,
    //   }),
    // );
  }

  async softDelete(_id: string): Promise<void> {
    // await this.userRepository.softDelete(id);
  }
}
