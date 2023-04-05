import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProductService } from './DeleteProductService';

class DeleteProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const service = container.resolve(DeleteProductService);

    await service.execute({
      id,
      user_id,
    });

    return response.status(204).send();
  }
}

export { DeleteProductController };
