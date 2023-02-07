import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { userViewModel } from '@modules/user/infra/http/view-models/userViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserService } from './UpdateUserService';

export class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const data = request.body as Omit<ICreateUserDTO, 'password'>;

    const service = container.resolve(UpdateUserService);

    const result = await service.execute({
      id,
      user_id,
      ...data,
    });

    return response.json(userViewModel.toHTTP(result));
  }
}
