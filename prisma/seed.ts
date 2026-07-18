import { PrismaPg } from '@prisma/adapter-pg';
import { buildDataUrl } from '../build-data-url';
import { PrismaClient } from '../generated/client';
import {
  ARTICLES_DATA,
  CATEGORIES_DATA,
  COMMENTS_DATA,
  TAGS_DATA,
  USERS_DATA,
} from './data';

const adapter = new PrismaPg({ connectionString: buildDataUrl() });
const prisma = new PrismaClient({ adapter });

async function runSeed() {
  console.log('🌱 Seeding started...');

  await prisma.user.createMany({
    data: USERS_DATA,
    skipDuplicates: true,
  });

  console.log('🚀 Users have been created successfully.');

  await prisma.category.createMany({
    data: CATEGORIES_DATA,
    skipDuplicates: true,
  });

  console.log('🚀 Categories have been created successfully.');

  await prisma.tag.createMany({
    data: TAGS_DATA,
    skipDuplicates: true,
  });

  console.log('🚀 Tags have been created successfully.');

  await Promise.all(
    ARTICLES_DATA.map(({ author, category, tags, ...data }) =>
      prisma.article.create({
        data: {
          ...data,
          user: { connect: { login: author } },
          category: { connect: { name: category } },
          tags: { connect: tags.map((name) => ({ name })) },
        },
      }),
    ),
  );

  console.log('🚀 Articles have been created');

  await Promise.all(
    COMMENTS_DATA.map(({ author, article, content }) =>
      prisma.comment.create({
        data: {
          content,
          article: { connect: { title: article } },
          user: { connect: { login: author } },
        },
      }),
    ),
  );

  console.log('🚀 Comments have been created successfully.');
  console.log('🎉 Seeding finished successfully.');
}

runSeed()
  .catch((err) => {
    console.error('📛 Seeding failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
