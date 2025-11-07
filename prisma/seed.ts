import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("admin123", 8);

  await prisma.member.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin Member",
      email: "admin@example.com",
      password: passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Admin member created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
