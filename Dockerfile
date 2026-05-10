# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build-time vars (VITE)
ARG VITE_BASE_API_URL
ARG VITE_STORAGE_URL
ARG VITE_AI_SERVICE_URL
ARG VITE_USE_LARAVEL_AI_GATEWAY=true
ARG VITE_AI_TIMEOUT_MS=30000
ARG VITE_APP_NAME=Spentaru Archive Frontend

ENV VITE_BASE_API_URL=$VITE_BASE_API_URL
ENV VITE_STORAGE_URL=$VITE_STORAGE_URL
ENV VITE_AI_SERVICE_URL=$VITE_AI_SERVICE_URL
ENV VITE_USE_LARAVEL_AI_GATEWAY=$VITE_USE_LARAVEL_AI_GATEWAY
ENV VITE_AI_TIMEOUT_MS=$VITE_AI_TIMEOUT_MS
ENV VITE_APP_NAME=$VITE_APP_NAME

RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]