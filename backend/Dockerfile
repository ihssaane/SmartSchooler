
FROM node:18-alpine

# Install dependencies required for bcrypt
RUN apk add --no-cache make gcc g++ python3

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with rebuild of bcrypt
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copy rest of the application
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
