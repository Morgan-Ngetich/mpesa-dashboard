# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:20 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

ARG VITE_API_URL=${VITE_API_URL}

ARG CACHE_BUST
RUN echo "Building with cache bust: ${CACHE_BUST}"

RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# Copy SSL certificates
COPY ./nginx/ssl/nginx.crt /etc/nginx/ssl/nginx.crt
COPY ./nginx/ssl/nginx.key /etc/nginx/ssl/nginx.key


COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf