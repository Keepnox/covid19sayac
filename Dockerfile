FROM node:12-alpine as dev

WORKDIR /app

RUN apk add --update util-linux git python make bash g++ tzdata

COPY ./package*.json /app/

RUN npm install

COPY . /app

FROM node:12-alpine as builder

WORKDIR /app

COPY --from=dev /app /app

RUN npm run build

CMD ["npm", "start"]

FROM node:12-alpine as generator

WORKDIR /app

COPY --from=builder /app /app

RUN npm run generate

FROM nginx:alpine as prod

COPY --from=generator /app/dist /usr/share/nginx/html
