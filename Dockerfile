FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci 

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/StudyManager/browser /app
EXPOSE 80

CMD cp app/index.csr.html usr/share/nginx/html/index.html