const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
}});

let jsonObj = {};

const initializeJson = (prevObject) => {
    jsonObj = {};
    for(let i =0; i<45; i++) {
        const randomResult = Math.floor(Math.random() * 4);
        if(randomResult != prevObject[i]) {
            jsonObj[i] = randomResult;
        }
    }
  
    return Promise.resolve(jsonObj);
}

io.on('connection', (socket) => {
socket.on('sendData', async  (arr) => {
    setInterval(async() => {
        const data = arr.length > 0 ? await initializeJson(jsonObj) : await initializeJson({})  
        socket.emit('request', data );
    }, 500)
})
});

server.listen(3001, () => {
    console.log('server listen 3001');
})



