import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCommerceService } from './DeleteCommerceService';

class DeleteCommerceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const service = container.resolve(DeleteCommerceService);

    await service.execute({
      id,
      user_id,
    });

    return response.status(204).send();
  }
}

export { DeleteCommerceController };
