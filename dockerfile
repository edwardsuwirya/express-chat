from node:lts-alpine3.9
WORKDIR /apps
COPY . .
RUN npm install
ENTRYPOINT ["node","index.js"]
