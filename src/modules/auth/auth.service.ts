import { Service } from 'typedi';

import { UserRepository } from '../user';
import type { AuthRegisterDto } from './dto';

@Service()
export class AuthService {
  constructor() {}

  // eslint-disable-next-line max-len
  // @Logger(__filename) private log: LoggerInterface // @EventDispatcher() private eventDispatcher: EventDispatcherInterface, // @OrmRepository() private userRepository: UserRepository,

  // public find(): Promise<User[]> {
  //     // this.log.info('Find all users');
  //     return this.userRepository.find({ relations: ['pets'] });
  // }

  async register(dto: AuthRegisterDto) {
    console.info('>>>>>>>>>>>', dto);
    // try {
    //   await this.userRepository.save(dto);
    // } catch (error) {
    //   console.log('>>>>>>>>>>>', error);
    // }

    const user = UserRepository.create(dto);

    return await UserRepository.save(user);
  }

  // public async create(user: User): Promise<User> {
  //     this.log.info('Create a new user => ', user.toString());
  //     user.id = uuid.v1();
  //     const newUser = await this.userRepository.save(user);
  //     this.eventDispatcher.dispatch(events.user.created, newUser);
  //     return newUser;
  // }

  // public update(id: string, user: User): Promise<User> {
  //     this.log.info('Update a user');
  //     user.id = id;
  //     return this.userRepository.save(user);
  // }

  // public async delete(id: string): Promise<void> {
  //     this.log.info('Delete a user');
  //     await this.userRepository.delete(id);
  //     return;
  // }
}
