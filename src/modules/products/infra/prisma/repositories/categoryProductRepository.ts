import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { CategoryProduct} from '../../../entities/categoryProduct';
import { CategoryProductMappers } from '../mappers/categoryProductMappers';

export class CategoryProductRepository implements ICategoryProductRepository {
  public async create(category: CategoryProduct): Promise<void> {
    const raw = CategoryProductMappers.toPrisma(category);
    await prismaClient.categoryProduct.create({ data: raw });
  }

  public async update(category: CategoryProduct): Promise<CategoryProduct> {
    const raw = CategoryProductMappers.toPrisma(category);
    const userUpdate = await prismaClient.categoryProduct.update({
      where: { id: category.id },
      data: raw,
    });

    return CategoryProductMappers.toDomain(userUpdate);
  }

  public async findById(id: string): Promise<CategoryProduct | null> {
    const category = await prismaClient.categoryProduct.findUnique({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return CategoryProductMappers.toDomain(category);
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.categoryCommerce.delete({ where: { id } });
  }

  public async findByName(name: string): Promise<CategoryProduct | null> {
    const category = await prismaClient.categoryProduct.findFirst({
      where: { name },
    });

    if (!category) {
      return null;
    }

    return CategoryProductMappers.toDomain(category);
  }
}
