import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCategoryProductService } from './DeleteCategotyProductService';

class DeleteCategoryProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const product_id = request.user.id;

    const service = container.resolve(DeleteCategoryProductService);

    await service.execute({
      id,
      product_id,
    });

    return response.status(204).send();
  }
}

export { DeleteCategoryProductController };
