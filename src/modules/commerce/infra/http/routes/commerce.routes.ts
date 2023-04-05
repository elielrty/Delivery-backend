import { ensureAuthenticated } from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import { CreateCommerceController } from '@modules/commerce/services/Commerce/CreateCommerce/CreateCommerceController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const commerceRouter = Router();

const createCommerceController = new CreateCommerceController();

commerceRouter.use(ensureAuthenticated);

commerceRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        phone: Joi.string().required(),
        category_id: Joi.string().uuid().required(),
        users: Joi.array().items(Joi.string().uuid()).required(),
      },
    },
    { abortEarly: false },
  ),
  createCommerceController.handle,
);

export { commerceRouter };
