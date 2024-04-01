FROM node:21-alpine3.18 as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:21-alpine3.18

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist ./usr/src/app/dist

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]