import { CategoryCommerce } from '@modules/commerce/entities/categoryCommerce';
import { CategoryCommerce as RawCategory } from '@prisma/client';

export class CategoryCommerceMappers {
  static toPrisma(categoryCommerce: CategoryCommerce) {
    return {
      id: categoryCommerce.id,
      name: categoryCommerce.name,
      description: categoryCommerce.description,
      updateBy: categoryCommerce.updateBy,
      createBy: categoryCommerce.createBy,
      updateAt: categoryCommerce.updateAt,
      deleteBy: categoryCommerce.deleteBy,
    };
  }

  static toDomain(raw: RawCategory): CategoryCommerce {
    return new CategoryCommerce(
      {
        name: raw.name,
        description: raw.description,
      },
      raw.id,
    );
  }
}
