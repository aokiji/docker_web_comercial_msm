FROM node:4

RUN useradd -m -d /usr/src/app node
USER node
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY gulpfile.js /usr/src/app/
RUN npm install


CMD [ "npm", "start" ]
