import { Service } from 'typedi';

import type { User } from '../user/entities/user.entity';

export interface IAuthService {
  findOne(id: string): Promise<User | undefined>;
}

@Service()
export class AuthService implements IAuthService {
  constructor() {}
  // eslint-disable-next-line max-len
  // @Logger(__filename) private log: LoggerInterface // @EventDispatcher() private eventDispatcher: EventDispatcherInterface, // @OrmRepository() private userRepository: UserRepository,

  // public find(): Promise<User[]> {
  //     // this.log.info('Find all users');
  //     return this.userRepository.find({ relations: ['pets'] });
  // }

  public findOne(id: string): Promise<User | undefined> {
    // return this.userRepository.findOne({ id });
    return Promise.resolve<User>({
      id,
      email: 'axnguyen.it@gmail.com',
      username: '',
    });
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
