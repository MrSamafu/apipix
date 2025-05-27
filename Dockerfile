FROM node:current-alpine3.21

RUN npm i pm2 -g

ADD . /var/www/apipix
WORKDIR /var/www/apipix

EXPOSE 3000
CMD pm2 start apipix