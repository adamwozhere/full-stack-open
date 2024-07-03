FROM node:20

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm run dev is the command to start the application in development mode
# --host needed to expose the dev server to be visible outside docker network,
# by default the dev server is exposed only to localhost, and despite we access the frontend
# still using the localhost address, it is in reality attached to the docker network.
CMD ["npm", "run", "dev", "--", "--host"]