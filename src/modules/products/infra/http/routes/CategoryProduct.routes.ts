import { ensureAuthenticated } from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import { CreateCategoryProductController } from '@modules/products/services/CategoryProduct/CreateCategoryProduct/CreateCategoryProductController';
import { DeleteCategoryProductController } from '@modules/products/services/CategoryProduct/DeleteCategoryProduct/DeleteCategoryProductController';
import { UpdateCategoryProductsController } from '@modules/products/services/CategoryProduct/UpdateCategoryProduct/UpdateCategoryProductsController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const categoryProductRouter = Router();

const createCategoryProductController = new CreateCategoryProductController();
const updateCategoryProductsController = new UpdateCategoryProductsController();
const deleteCategoryProductController = new DeleteCategoryProductController();

categoryProductRouter.use(ensureAuthenticated);

categoryProductRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        type: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  createCategoryProductController.handle,
);

categoryProductRouter.put(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        type: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  updateCategoryProductsController.handle,
);

categoryProductRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteCategoryProductController.handle,
);

export { categoryProductRouter };
