import { Product } from '@modules/products/entities/product';
import { Product as RawCategory } from '@prisma/client';

export class ProductMappers {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      value: product.value,
      isDiscount: product.isDiscount,
      category_id: product.category_id,
      updateBy: product.updateBy,
      createBy: product.createBy,
      updateAt: product.updateAt,
      deleteBy: product.deleteBy,
    };
  }

  static toDomain(raw: RawCategory): Product {
    return new Product(
      {
        name: raw.name,
        description: raw.description,
        value: raw.value,
        isDiscount: raw.isDiscount,
        category_id: raw.category_id,
      },
      raw.id,
    );
  }
}
