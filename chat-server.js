var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    static = require( 'node-static'),
    socketio = require('socket.io'),
    createChat = require('./create_chat.js');

var file = new static.Server('./public');
  
var server = http.createServer(function(req, res){
  req.addListener('end', function() {
    file.serve(req, res);
  }).resume()


});

server.listen(8000);

var io = socketio(server);
createChat.createChat(io);

