import '@modules/user/providers';
import './providers';

import { CategoryCommerceRepository } from '@modules/commerce/infra/prisma/repositories/categoryCommerceRepository';
import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { UserRepository } from '@modules/user/infra/prisma/repositories/userRepository';
import { UserTokensRepository } from '@modules/user/infra/prisma/repositories/userTokensRepository';
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
