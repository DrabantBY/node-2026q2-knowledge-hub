import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: `postgresql://${env('POSTGRES_USER')}:${env('POSTGRES_PASSWORD')}@localhost:${env('POSTGRES_PORT')}/${env('POSTGRES_DB')}?schema=public`,
  },
});
