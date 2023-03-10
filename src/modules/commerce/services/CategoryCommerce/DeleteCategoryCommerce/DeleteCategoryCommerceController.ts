import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCategoryCommerceService } from './DeleteCategoryCommerceService';

class DeleteCategoryCommerceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const service = container.resolve(DeleteCategoryCommerceService);

    await service.execute({
      id,
      user_id,
    });

    return response.status(204).send();
  }
}

export { DeleteCategoryCommerceController };
