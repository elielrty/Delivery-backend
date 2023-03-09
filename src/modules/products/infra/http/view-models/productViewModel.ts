import { Product } from '@modules/products/entities/product';

export class productViewModel {
  static toHTTP(product: Product) {
    const props = {
      name: product.name,
      description: product.description,
      value: product.value,
      isDiscount: product.isDiscount,
      category_id: product.category_id,
    };
    const { id } = product;

    return { id, ...{ props } };
  }
}
