const frameRate = 6
const interval = 1/frameRate * 1000

var joystick = new VirtualJoystick({
        mouseSupport     : true,
        stationaryBase   : true,
        baseX            : 200,
        baseY            : 200
    });

var socket = io();

var stopped = {direction : 0, speed : 0}

function getDirection(y, x) {
    var deg = Math.atan2(y, x) * 180 / Math.PI + 90
    if (deg <= 0) { deg = 360 + deg }
    return deg
}

function getSpeed(x, y) {
    return Math.sqrt( Math.pow(joystick.deltaX(), 2) + Math.pow(joystick.deltaY(), 2) )   
}

setInterval(function(){
    
    const direction = getDirection(joystick.deltaY(), joystick.deltaX())

    const speed =  getSpeed(joystick.deltaX(), joystick.deltaY())

    const data = {
        direction   : direction,
        speed       : speed
    }

    const eventData = (joystick._pressed ? data : stopped)
    
    socket.emit('move', eventData)

}, interval);
