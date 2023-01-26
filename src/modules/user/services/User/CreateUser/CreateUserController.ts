import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { userViewModel } from '@modules/user/infra/http/view-models/userViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from './CreateUserService';

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateUserDTO;

    const service = container.resolve(CreateUserService);

    const result = await service.execute(data);

    return response.status(201).json(userViewModel.toHTTP(result));
  }
}
