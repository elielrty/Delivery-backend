import { CategoryProduct } from '@modules/products/entities/categoryProduct';
import { CategoryProduct as RawCategory } from '@prisma/client';

export class CategoryProductMappers {
  static toPrisma(categoryProduct: CategoryProduct) {
    return {
      id: categoryProduct.id,
      name: categoryProduct.name,
      type: categoryProduct.type,
      updateBy: categoryProduct.updateBy,
      createBy: categoryProduct.createBy,
      updateAt: categoryProduct.updateAt,
      deleteBy: categoryProduct.deleteBy,
    };
  }

  static toDomain(raw: RawCategory): CategoryProduct {
    return new CategoryProduct(
      {
        name: raw.name,
        type: raw.type,
      },
      raw.id,
    );
  }
}
