const cors = require('cors');
const axios = require("axios");
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

io.on("connection", socket => {

    socket.on("getDoc", userId => {
        getApiAndEmit(io, userId);
    });

    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async (io, userId) => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        io.emit("document", res.data);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

http.listen(3000, () => {
    console.log('listening on *:3000');
});

