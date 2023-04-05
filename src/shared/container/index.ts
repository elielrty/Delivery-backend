import '@modules/user/providers';
import './providers';

import { CategoryCommerceRepository } from '@modules/commerce/infra/prisma/repositories/categoryCommerceRepository';
import { CommerceRepository } from '@modules/commerce/infra/prisma/repositories/commerceRepository';
import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { ICommerceRepository } from '@modules/commerce/repositories/ICommerceRepository';
import { CategoryProductRepository } from '@modules/products/infra/prisma/repositories/categoryProductRepository';
import { ProductRepository } from '@modules/products/infra/prisma/repositories/productRepository';
import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';
import { IProductRepository } from '@modules/products/repositories/IProductsRepository';
import { RolesRepository } from '@modules/user/infra/prisma/repositories/rolesRepository';
import { UserRepository } from '@modules/user/infra/prisma/repositories/userRepository';
import { UserTokensRepository } from '@modules/user/infra/prisma/repositories/userTokensRepository';
import { IRolesRepository } from '@modules/user/repositories/IRolesRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/user/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICategoryCommerceRepository>(
  'CategoryCommerceRepository',
  CategoryCommerceRepository,
);

container.registerSingleton<ICategoryProductRepository>(
  'CategoryProductRepository',
  CategoryProductRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ICommerceRepository>(
  'CommerceRepository',
  CommerceRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
