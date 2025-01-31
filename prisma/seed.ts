import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      username: 'teste',
      password: '$2b$10$H62/bxhk4DJtNkNXzsCNJuDPlFKHiHtHPTkl6eW78IreD/sYCPiQK', // 123456
      isActive: true,
      createdAt: new Date(),
      termsAccepted: true,
      permissions: {
        create: [
          {
            interface: 'user',
            view: true,
            add: true,
            edit: true,
            delete: true,
          },
          {
            interface: 'permission',
            view: true,
            add: true,
            edit: true,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
