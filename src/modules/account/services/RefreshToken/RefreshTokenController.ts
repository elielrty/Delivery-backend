import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenService } from './RefreshTokenService';

class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const refresh_token =
      request.body.refresh_token ||
      request.headers['x-access-refresh_token'] ||
      request.query.refresh_token;

    const service = container.resolve(RefreshTokenService);

    const result = await service.execute(refresh_token);

    return response.json(result);
  }
}

export { RefreshTokenController };
