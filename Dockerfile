FROM node:18
WoRKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node" , "index"]

