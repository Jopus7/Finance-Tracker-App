FROM node:lts-alpine

RUN apk add --no-cache --update --quiet curl
RUN curl -sL https://taskfile.dev/install.sh | sh

WORKDIR /app

ENV PORT=80
EXPOSE 80

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["yarn", "start"]
