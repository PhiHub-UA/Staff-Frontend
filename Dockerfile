# Use official Node 20 image
FROM node:20 AS build

# Set working directory
WORKDIR /Staff-Frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

RUN npm install

# Copy the source code
COPY . .

# Expose the port where Vite server will run
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]