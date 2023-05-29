# Stage 1: Install dependencies and build the Vue project
FROM node:14 as build-stage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app 
FROM nginx:1.21

COPY --from=build-stage /app/dist /usr/share/nginx/html
