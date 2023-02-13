import { ensureAuthenticated } from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import { CreateCategoryProductController } from '@modules/products/services/CategoryProduct/CreateCategoryProduct/CreateCategoryProductController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const categoryProductRouter = Router();

const createCategoryProductController = new CreateCategoryProductController();

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

export { categoryProductRouter };
