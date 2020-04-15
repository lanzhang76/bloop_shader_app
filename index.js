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
var code = ''
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
            news: in_name // updates on who joined
        });
    })

    // when client pushes code, it's stored in the global code 
    socket.on('pushCode', function (data) {
        console.log(`${socket.id} pushed code.`)
        code = data;
        io.sockets.emit('consoleUpdate', { person: coder.name, action: "push" })
    })

    // when coders pull, it't updated to that one client only
    socket.on('pullCode', function (data) {
        console.log(`${socket.id} pulled update.`)
        io.to(socket.id).emit('update_global', code)
        io.sockets.emit('consoleUpdate', { person: coder.name, action: "pull" })
    })

    // force updates to all 
    socket.on('updateAll', function (data) {
        console.log(`${socket.id} updated to all users.`)
        code = data;
        io.sockets.emit('update_global', code);
        io.sockets.emit('consoleUpdate', { person: coder.name, action: "push_all" })
    })

    // reactions:
    socket.on('reaction', function (data) {
        io.sockets.emit('reactions', { person: coder.name, reaction: data })
    })

    // when coder disconencts, update number:
    socket.on('disconnect', function (data) {
        subCoder();
        currentCoders.splice(currentCoders.indexOf(coder.name), 1);
        io.sockets.emit('update_leave', {
            num: totalCoder, // updates on total number
            who: currentCoders, // updates on who's in the room
            news: coder.name // updates on who left
        })
    });

})


// methods:
function addCoder() {
    totalCoder++;
}

function subCoder() {
    totalCoder--;
}

