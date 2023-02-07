import { sessionsRouter } from '@modules/account/infra/http/routes/sessions.routes';
import { categoryCommerceRouter } from '@modules/commerce/infra/http/routes/CategoryCommerce.routes';
import { usersRouter } from '@modules/user/infra/http/routes/users.routes';
import express from 'express';

export const routes = express.Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/category-commerce', categoryCommerceRouter);
