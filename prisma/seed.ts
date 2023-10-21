import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function seed() {
  const batchSize = 500; // ajusta este valor según las capacidades de tu sistema
  const numOfBatches = Math.floor(1000000 / batchSize);

  for (let i = 0; i <= numOfBatches; i++) {
    const allPromises = [];

    for (let j = 0; j < batchSize; j++) {
      const index = i * batchSize + j;
      const data = {
        name: `store ${index + 1}`,
        sub: `${index + 1}`,
        address: `address ${index + 1}`,
      };
      allPromises.push(prisma.store.create({ data }));
    }
    await Promise.all(allPromises);
  }
}

async function main() {
  await prisma.$connect();
  await seed();
  // Llama a las demás funciones de generación de datos aquí...
  await prisma.$disconnect();
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
