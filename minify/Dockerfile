FROM node:8

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY gulpfile.js /usr/src/app/

RUN chmod a+w /usr/src/app

CMD [ "npm", "start" ]
