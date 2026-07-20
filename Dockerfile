#create build image
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#create production image
FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache curl
RUN addgroup -S rss && adduser -S -G rss student
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
RUN chown -R student:rss /app
USER student
EXPOSE 4000
CMD ["node", "dist/src/main.js"]
