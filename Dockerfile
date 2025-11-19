FROM node:18.18-alpine AS build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

## run stage ##
FROM nginx:alpine
WORKDIR /app

COPY --from=build /app/dist /app

RUN mkdir -p /var/cache/nginx && chown -R 1000:1000 /var/cache/nginx

RUN touch /var/run/nginx.pid && chown -R 1000:1000 /var/run/nginx.pid

RUN chown -R 1000:1000 /app

COPY nginx.conf /etc/nginx/nginx.conf
USER 1000
