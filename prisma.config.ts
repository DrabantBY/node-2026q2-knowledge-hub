import { defineConfig } from 'prisma/config';
import { buildDataUrl } from './build-data-url';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node -r tsconfig-paths/register prisma/seed.ts',
  },
  datasource: {
    url: buildDataUrl(),
  },
});
