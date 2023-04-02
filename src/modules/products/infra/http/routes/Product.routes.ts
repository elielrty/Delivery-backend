import { ensureAuthenticated } from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import { CreateProductController } from '@modules/products/services/Product/CreateProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/services/Product/DeleteProduct/DeleteProductController';
import { UpdateProductsController } from '@modules/products/services/Product/UpdateProduct/UpdateProductsController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const ProductRouter = Router();

const createProductController = new CreateProductController();
const updateProductsController = new UpdateProductsController();
const deleteProductController = new DeleteProductController();

ProductRouter.use(ensureAuthenticated);

ProductRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string(),
        value: Joi.string().required(),
        isDiscount: Joi.boolean().required(),
        category_id: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  createProductController.handle,
);

ProductRouter.put(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string(),
        value: Joi.string().required(),
        isDiscount: Joi.boolean().required(),
        category_id: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  updateProductsController.handle,
);

ProductRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteProductController.handle,
);

export { ProductRouter };
