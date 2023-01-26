import { userViewModel } from '@modules/user/infra/http/view-models/userViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from './AuthenticateUserService';

export class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const service = container.resolve(AuthenticateUserService);

    const { refresh_token, token, user } = await service.execute({
      email,
      password,
    });

    return response.json({
      user: userViewModel.toHTTP(user),
      token,
      refresh_token,
    });
  }
}
