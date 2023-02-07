// import type { User } from '~/modules/user/entities/user.entity';

// import type { AppRole } from './role.enum';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.getAllAndOverride<Array<AppRole>>('roles', [
//       context.getClass(),
//       context.getHandler(),
//     ]);

//     if (roles.length === 0) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = <User>request.user;

//     return roles.includes(user?.role?.id);
//   }
// }
export {};
