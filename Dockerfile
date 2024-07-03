from node:20
WORKDIR /app
# COPY package.json package-lock.json ./

# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD npm start

COPY . .

# Makes sure npm is up to date otherwise install dependencies attempts will fail
# RUN npm install -g npm

# Install dependencies
RUN npm install

# The process this container should run
CMD ["npm", "start"]