FROM node:lts-alpine
ENV NODE_ENV=production
ENV REDIS_URI=redis://default:ArSbujtgd9MqCvoAXOC3VjVio7K3BPI8@redis-18835.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:18835
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
