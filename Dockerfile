# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN yarn install
# add app
COPY . ./
RUN yarn build
EXPOSE ${PORT:-3000}
# start app
CMD ["serve","-s", "build", "-l", ${PORT:-3000}]