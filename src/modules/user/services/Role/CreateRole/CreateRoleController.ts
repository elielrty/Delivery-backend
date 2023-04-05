import { ICreateRolesDTO } from '@modules/user/dtos/ICreateRolesDTO';
import { rolesViewModel } from '@modules/user/infra/http/view-models/rolesViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRoleService } from './CreateRoleService';

export class CreateRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { role } = request.body as ICreateRolesDTO;

    const user_id = request.user.id;

    const service = container.resolve(CreateRoleService);

    const result = await service.execute({ role, createBy: user_id });

    return response.status(201).json(rolesViewModel.toHTTP(result));
  }
}
