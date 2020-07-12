# Install node v12
FROM node:12-buster

# Set the workdir /var/www/myapp
WORKDIR /usr/src/app

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install
RUN npm i nodemon -g

# Copy application source
COPY . .

# Copy .env.docker to workdir/.env - use the docker env
# COPY docker.env ./.env

# Expose application ports - (3700 - for API)
EXPOSE 3700

# Generate build
# RUN npm run build

# Start the application
CMD ["npm", "start"]
# CMD ["/usr/src/app/node_modules/.bin/nodemon", "src/index.js"]
