# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_BASE_API_URL
ARG VITE_STORAGE_URL
ARG VITE_AI_SERVICE_URL
ARG VITE_USE_LARAVEL_AI_GATEWAY
ARG VITE_AI_TIMEOUT_MS
ARG VITE_APP_NAME

ENV VITE_BASE_API_URL=$VITE_BASE_API_URL
ENV VITE_STORAGE_URL=$VITE_STORAGE_URL
ENV VITE_AI_SERVICE_URL=$VITE_AI_SERVICE_URL
ENV VITE_USE_LARAVEL_AI_GATEWAY=$VITE_USE_LARAVEL_AI_GATEWAY
ENV VITE_AI_TIMEOUT_MS=$VITE_AI_TIMEOUT_MS
ENV VITE_APP_NAME=$VITE_APP_NAME

RUN npm run build

# Production Stage
FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
