import { ensureAuthenticated } from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import { CreateCategoryCommerceController } from '@modules/commerce/services/CategoryCommerce/CreateCategoryCommerce/CreateCategoryCommerceController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const categoryCommerceRouter = Router();

const createCategoryCommerceController = new CreateCategoryCommerceController();

categoryCommerceRouter.use(ensureAuthenticated);

categoryCommerceRouter.post(
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
  createCategoryCommerceController.handle,
);

export { categoryCommerceRouter };
