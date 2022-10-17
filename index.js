const cors=require('cors');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('getUnitStatus', (msg) => {
        io.emit('receiveMessage', `server: ${msg}`);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

