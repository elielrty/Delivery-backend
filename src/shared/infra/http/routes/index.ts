import { sessionsRouter } from '@modules/account/infra/http/routes/sessions.routes';
import { categoryCommerceRouter } from '@modules/commerce/infra/http/routes/CategoryCommerce.routes';
import { commerceRouter } from '@modules/commerce/infra/http/routes/commerce.routes';
import { categoryProductRouter } from '@modules/products/infra/http/routes/CategoryProduct.routes';
import { ProductRouter } from '@modules/products/infra/http/routes/Product.routes';
import { rolesRouter } from '@modules/user/infra/http/routes/roles.routes';
import { usersRouter } from '@modules/user/infra/http/routes/users.routes';
import express from 'express';

export const routes = express.Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/category-commerces', categoryCommerceRouter);
routes.use('/commerces', commerceRouter);
routes.use('/category-products', categoryProductRouter);
routes.use('/products', ProductRouter);
routes.use('/roles', rolesRouter);
