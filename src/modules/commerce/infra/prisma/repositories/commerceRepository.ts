import { ICommerceRepository } from '@modules/commerce/repositories/ICommerceRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { Commerce } from '../../../entities/commerce';
import { CommerceMappers } from '../mappers/commerceMappers';

export class CommerceRepository implements ICommerceRepository {
  public async create(commerce: Commerce): Promise<void> {
    const raw = CommerceMappers.toPrisma(commerce);
    await prismaClient.commerce.create({
      data: {
        cnpj: raw.cnpj,
        name: raw.name,
        phone: raw.phone,
        isOpen: raw.isOpen,
        category: { connect: { id: raw.category_id } },
        users: { connect: raw.users?.map(user => ({ id: user.id })) },
      },
    });
  }

  public async update(commerce: Commerce): Promise<Commerce> {
    const raw = CommerceMappers.toPrisma(commerce);
    const update = await prismaClient.commerce.update({
      where: { id: commerce.id },
      include: {
        users: { include: { roles: true } },
        category: true,
      },
      data: {
        cnpj: raw.cnpj,
        updateAt: raw.updateAt,
        updateBy: raw.updateBy,
        isOpen: raw.isOpen,
        name: raw.name,
        phone: raw.phone,
        users: { connect: raw.users?.map(user => ({ id: user.id })) },
      },
    });

    return CommerceMappers.toDomain(update);
  }

  public async findById(id: string): Promise<Commerce | null> {
    const commerce = await prismaClient.commerce.findUnique({
      where: { id },
      include: {
        users: { include: { roles: true } },
        category: true,
      },
    });

    if (!commerce) {
      return null;
    }

    return CommerceMappers.toDomain(commerce);
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.commerce.delete({ where: { id } });
  }

  public async findByName(name: string): Promise<Commerce | null> {
    const commerce = await prismaClient.commerce.findFirst({
      where: { name },
      include: {
        users: { include: { roles: true } },
        category: true,
      },
    });

    if (!commerce) {
      return null;
    }

    return CommerceMappers.toDomain(commerce);
  }
}
