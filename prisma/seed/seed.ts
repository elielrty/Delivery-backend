import { PrismaClient } from '@prisma/client';

import roles from './roles.json';
import user from './user.json';

const prisma = new PrismaClient();
async function main() {
  await prisma.role.createMany({ data: roles });

  await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
      phone: user.phone,
      roles: { connect: user.roles.map(role => ({ id: role.id })) },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
