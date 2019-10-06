fs = require("fs");
const express = require('express');
const app = express();
const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem")
  };
const https = require('https').Server(options, app);
const io = require('socket.io')(https);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = https.listen(443, function() {
    console.log('listening on *:443');
});