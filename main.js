//Lets require/import the HTTP module
var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var sphero = require("sphero");
var bb8 = sphero("28e2fb59aab64afe8139d64faee3bca5"); // change BLE address accordingly

// Routing
app.use(express.static(__dirname + '/public'));

const PORT=3000;

bb8.connect(function() {
    // roll BB-8 in a random direction, changing direction every second
    bb8.isConnected = true
});

io.on('connection', function(socket){
    console.log("Client connected");
    //movement data should be passed as a object
    // { direction: Int (0-360), speed: Int (0-50  }
    socket.on('move', function(data){
        if (bb8.isConnected) {
            console.log(data)
            bb8.roll(data.speed, data.direction)
        }
    });

    socket.on('disconnect', function(){});
});

server.listen(PORT);