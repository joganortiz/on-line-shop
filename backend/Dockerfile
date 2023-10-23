FROM node:18.17-alpine3.17 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install -g npm@latest && npm i -g pnpm
RUN pnpm install


FROM node:18.17-alpine3.17 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN npm install -g npm@latest && npm i -g pnpm
RUN pnpm run build

FROM node:18.17-alpine3.17 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install -g npm@latest && npm i -g pnpm
RUN pnpm install --prod


FROM node:18.17-alpine3.17 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
CMD ["node","build/Apps/start.js"]
