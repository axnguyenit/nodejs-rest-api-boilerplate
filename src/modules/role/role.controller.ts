import { StatusCodes } from 'http-status-codes';
import { Controller, Get, HttpCode } from 'routing-controllers';

import { RoleService } from './role.service';

@Controller('/roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll() {
    return this.roleService.findAll();
  }
}
