FROM node:18.17.0-alpine3.17 AS development

ENV CHOKIDAR_USEPOLLING=true
ENV CI=true

RUN apk add --update --no-cache curl py-pip

WORKDIR /backend
COPY package.json package-lock.json /backend/
RUN npm ci
COPY . .

CMD [ "npm", "run", "start-dev" ]

FROM development AS production

ENV CHOKIDAR_USEPOLLING=false

CMD [ "npm", "run", "start" ]


