import { ICreateRolesDTO } from '@modules/user/dtos/ICreateRolesDTO';
import { rolesViewModel } from '@modules/user/infra/http/view-models/rolesViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserService } from './UpdateUserService';

export class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const data = request.body as Omit<ICreateRolesDTO, 'createBy'>;

    const service = container.resolve(UpdateUserService);

    const result = await service.execute({
      id,
      user_id,
      ...data,
    });

    return response.json(rolesViewModel.toHTTP(result));
  }
}
