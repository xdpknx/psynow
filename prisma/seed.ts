import { PrismaClient } from '@prisma/client';
import questions from './data';
const prisma = new PrismaClient();

async function main() {
  for (var question of questions) {
    const q = await prisma.question.create({
      data: question,
    });
    console.log(q.id);
  }
}

main().finally(() => {
  prisma.$disconnect();
});
