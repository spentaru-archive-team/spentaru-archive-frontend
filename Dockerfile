# Build Stage
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ['npm', 'run', 'build']

