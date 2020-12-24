FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run db
CMD npm run build
CMD npm run from:build
EXPOSE 8000
