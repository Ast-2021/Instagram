FROM node:22.14.0-alpine

WORKDIR /instagram

COPY instagram/package.json instagram/package-lock.json ./

RUN npm install

COPY instagram/ ./

EXPOSE 3000

RUN ls ./ && echo "Contents of ./ listed above"

CMD ["npm", "start"]