FROM node:lts-alpine

RUN apk add --no-cache --update --quiet curl
RUN curl -sL https://taskfile.dev/install.sh | sh -s -- -b /usr/local/bin

WORKDIR /app

ENV PORT=80
EXPOSE 80

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start", "--host", "0.0.0.0", "--port", "80"]
