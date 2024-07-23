FROM node:20 as builder

WORKDIR /usr/src/app
ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as runner

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["node", "dist/main.js"]
