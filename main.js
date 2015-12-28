//Lets require/import the HTTP module
var server = require('http').createServer();
var sphero = require("sphero");
var io = require('socket.io')(server);

var bb8 = sphero("28e2fb59aab64afe8139d64faee3bca5"); // change BLE address accordingly

const PORT=3000;

bb8.connect(function() {
    // roll BB-8 in a random direction, changing direction every second
    bb8.isConnected = true
});

io.on('connection', function(socket){
    //movement data should be passed as a object
    // { direction: Int (0-360), speed: Int (0-50  }
    socket.on('move', function(data){
        if (bb8.isConnected) {
            console.log(data)
        }
    });



    socket.on('disconnect', function(){});
});

server.listen(PORT);