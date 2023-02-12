import type { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const userData: Array<Prisma.UserCreateInput> = [
  {
    email: 'superadmin@gmail.com',
    fullName: 'SuperAdmin',
    password: '@Passw0rd1',
    role: 'SuperAdmin',
    status: 'Active',
  },
  {
    email: 'admin@gmail.com',
    fullName: 'Admin',
    password: '@Passw0rd1',
    role: 'Admin',
    status: 'Active',
  },
  {
    email: 'user@gmail.com',
    fullName: 'User',
    password: '@Passw0rd1',
    role: 'User',
    status: 'Active',
  },
];

export class UserSeedService {
  constructor(private prisma: PrismaClient) {}

  async run() {
    const userList: Array<Prisma.Prisma__UserClient<User, never>> = [];

    for (const user of userData) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const countSuperAdmin = await this.prisma.user.count({
        where: {
          email: user.email,
        },
      });

      if (countSuperAdmin > 0) {
        continue;
      }

      userList.push(
        this.prisma.user.create({
          data: {
            ...user,
            password: hashedPassword,
          },
        }),
      );
    }

    await Promise.all(userList);
  }
}
