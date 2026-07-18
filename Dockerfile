FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

RUN apk add --no-cache curl
RUN addgroup -S nestjs && adduser -S nestjs -G nestjs

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated

RUN chown -R nestjs:nestjs /app

USER nestjs
EXPOSE 4000
CMD ["node", "dist/src/main"]
