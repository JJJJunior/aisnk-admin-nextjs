import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("prisma is connected");
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("prisma disconnected");
  })
  .catch(async (e) => {
    console.error("[prisma_client]", e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default prisma;
