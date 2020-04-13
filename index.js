var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 5000;
http.listen(port, function () {
    console.log('listening on *:5000');
});

// Socket connection as well as data transmission happens below:

var totalCoder = 0
var currentCoders = [];
io.on('connection', function (socket) {
    // per connection, we add one new coder in the room
    addCoder();
    var coder = {
        name: ''
    }

    // grabs name
    socket.on('userName', function (in_name) {
        coder.name = in_name;
        currentCoders.push(in_name);
        io.sockets.emit('update', {
            num: totalCoder,
            who: currentCoders,
            news: in_name
        });
    })

    // when coder leaves, update number:
    // disconenct
    socket.on('disconnect', function (data) {
        currentCoders.splice(currentCoders.indexOf(coder.name), 1);
        subCoder();
        io.sockets.emit('update', { num: totalCoder, who: currentCoders })
    });

})


// methods:
function addCoder() {
    totalCoder++;
}

function subCoder() {
    totalCoder--;
}

