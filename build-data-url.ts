import 'dotenv/config';

export const buildDataUrl = () => {
  const {
    POSTGRES_USER = '',
    POSTGRES_PASSWORD = '',
    POSTGRES_HOST = '',
    POSTGRES_PORT = '',
    POSTGRES_DB = '',
  } = process.env;

  return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`;
};
