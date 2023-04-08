import { Commerce } from '@modules/commerce/entities/commerce';
import {
  UserMappers,
  UserWithRoles,
} from '@modules/user/infra/prisma/mappers/userMappers';
import { Commerce as RawCommerce, CategoryCommerce } from '@prisma/client';

import { CategoryCommerceMappers } from './categoryCommerceMappers';

type commerceWithUsers = RawCommerce & {
  users: UserWithRoles[];
  category: CategoryCommerce;
};

export class CommerceMappers {
  static toPrisma(commerce: Commerce) {
    return {
      id: commerce.id,
      name: commerce.name,
      cnpj: commerce.cnpj,
      isOpen: commerce.isOpen,
      category_id: commerce.category.id,
      phone: commerce.phone,
      users: commerce.users
        ? commerce.users.map(user => UserMappers.toPrisma(user))
        : [],
      updateBy: commerce.updateBy,
      createBy: commerce.createBy,
      updateAt: commerce.updateAt,
      deleteBy: commerce.deleteBy,
    };
  }

  static toDomain(raw: commerceWithUsers): Commerce {
    return new Commerce(
      {
        name: raw.name,
        cnpj: raw.cnpj,
        category: CategoryCommerceMappers.toDomain(raw.category),
        isOpen: raw.isOpen,
        phone: raw.phone,
        users: raw.users ? UserMappers.toDomainArray(raw.users) : [],
      },
      raw.id,
    );
  }
}
