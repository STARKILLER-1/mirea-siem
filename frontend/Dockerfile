FROM node:latest

WORKDIR /app

RUN npm install -g serve

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5173
CMD ["serve", "-l", "5173", "-s", "dist"]