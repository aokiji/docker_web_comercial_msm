FROM node:4

RUN useradd -m -d /usr/src/app node
USER node
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY gulpfile.js /usr/src/app/

CMD [ "npm", "start" ]
