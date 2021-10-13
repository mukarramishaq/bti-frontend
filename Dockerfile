# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN yarn install
ENV PATH="./node_modules/.bin:$PATH"
# add app
COPY . ./
EXPOSE ${PORT:-3000}
# start app
CMD ["yarn", "start"]
