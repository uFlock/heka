FROM node:18.17.0-alpine3.17 AS development

ENV CHOKIDAR_USEPOLLING=true

RUN apk add --update --no-cache curl py-pip

WORKDIR /frontend
COPY package.json package-lock.json /frontend/
RUN npm ci
COPY . .

CMD [ "npm", "run", "dev"]

FROM development AS builder

ENV CHOKIDAR_USEPOLLING=false

RUN npm run build

FROM nginx:1.25.1-alpine AS production

COPY --from=builder /frontend/dist /usr/share/nginx/html
