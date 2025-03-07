bashCopy code
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 5000
COPY . .
CMD [ "node" , "index.js"]

