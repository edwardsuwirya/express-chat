const http = require('http');
const io = require('socket.io')();

const PORT = 8080;
const server = http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
        return;
    }
});

io.attach(server,{});
roomsList = ['barong','undergraduate','alpha','camelia','tanker'];

roomsList.forEach(createRoom);
function createRoom(room){
    var msgs = ['Welcome'];
    io.on('connection', (socket) => {
        socket.emit(room, msgs);

        socket.on(room, function(msg){
            if(msg === 'CLEAR!!!'){
                msgs = []
            }else{
                msgs.push(msg);
            }

            io.emit(room, msgs);
        });
    });
}

// createRoom('room01')

server.listen(PORT, function (err) {
    if (err) throw err;
    console.log("Ok")
});
