import { CategoryCommerce } from '@modules/commerce/entities/categoryCommerce';
import { CategoryCommerce as RawCategory } from '@prisma/client';

export class CategoryCommerceMappers {
  static toPrisma(categoryCommerce: CategoryCommerce) {
    return {
      id: categoryCommerce.id,
      name: categoryCommerce.name,
      type: categoryCommerce.type,
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
        type: raw.type,
      },
      raw.id,
    );
  }

  static toDomainArray(raws: RawCategory[]): CategoryCommerce[] {
    const categories = raws.map(category => {
      return new CategoryCommerce(
        {
          name: category.name,
          type: category.type,
          createdAt: category.createdAt,
        },
        category.id,
      );
    });
    return categories;
  }
}
