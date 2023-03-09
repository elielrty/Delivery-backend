import { IProductRepository } from '@modules/products/repositories/IProductsRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { Product } from '../../../entities/product';
import { ProductMappers } from '../mappers/productMappers';

export class ProductRepository implements IProductRepository {
  public async create(product: Product): Promise<void> {
    const raw = ProductMappers.toPrisma(product);
    await prismaClient.product.create({ data: raw });
  }

  public async update(product: Product): Promise<Product> {
    const raw = ProductMappers.toPrisma(product);
    const userUpdate = await prismaClient.product.update({
      where: { id: product.id },
      data: raw,
    });

    return ProductMappers.toDomain(userUpdate);
  }

  public async findById(id: string): Promise<Product | null> {
    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return ProductMappers.toDomain(product);
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.categoryCommerce.delete({ where: { id } });
  }

  public async findByName(description: string): Promise<Product | null> {
    const product = await prismaClient.product.findFirst({
      where: { description },
    });

    if (!product) {
      return null;
    }

    return ProductMappers.toDomain(product);
  }
}
