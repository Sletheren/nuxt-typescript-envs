# Please don't delete the commented lines, they are usefull to test in local
FROM node:12.13.0-alpine as dist

#This is to avoid having an error when missing because we use yarn to run the container
ENV NODE_ENV='production';

RUN mkdir -p /home/node/app
COPY . /home/node/app
WORKDIR /home/node/app

CMD [ "yarn", "start:prod" ]


