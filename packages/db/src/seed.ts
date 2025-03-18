import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

async function seed() {
  const user = await prismaClient.user.create({
    data: {
      id: "user1",
      name: "test ",
    },
  });

  const website = await prismaClient.website.create({
    data: {
      id: "1",
      url: "https://www.google.com",
      userId: user.id,
    },
  });

  const validator = await prismaClient.validator.create({
    data: {
      publicKey: "0x321323",
      location: "usa",
      ip: "127.0.0.1",
    },
  });

  await prismaClient.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "GOOD",
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      latency: 100,
      validatorId: validator.id,
    },
  });

  await prismaClient.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "BAD",
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
      latency: 100,
      validatorId: validator.id,
    },
  });
}

console.log("inside seed file");

seed()
  .then(async () => {
    console.log("successfully called seed file");
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.log("error calling seed file", e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
