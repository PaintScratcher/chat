# specify the node base image with your desired version node:<version>
FROM arm32v7/node
# replace this with your application's default port
EXPOSE 8080
WORKDIR /usr/src/app
RUN npm install express
RUN npm install socket.io
RUN npm install ejs
COPY ./ /usr/src/app
ENTRYPOINT node index.js
