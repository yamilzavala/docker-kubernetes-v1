# 1. Build our production bundle
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

# 2. Serve the bundle with http server
FROM nginx:1.27.0

COPY --from=build /app/dist /usr/share/nginx/html

