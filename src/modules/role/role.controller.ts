import { StatusCodes } from 'http-status-codes';
import { Controller, Get, HttpCode } from 'routing-controllers';

import { DI } from '~/core';

import type { RoleService } from './role.service';

@Controller('/roles')
export class RolesController {
  private roleService: RoleService;

  constructor() {
    this.roleService = DI.instance.roleService;
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll() {
    return this.roleService.findAll();
  }
}
