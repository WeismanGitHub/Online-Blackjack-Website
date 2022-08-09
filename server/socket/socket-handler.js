const GameSchema = require('../schemas/game-schema')
const UserSchema = require('../schemas/user-schema')
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function socketHandler(socket) {
    const token = cookie.parse(socket.handshake.headers.cookie).token
    const { name, _id } = jwt.verify(token, process.env.JWT_SECRET)
    
    socket.on('joinGame', (data) => {
        const gameId = data.gameId
        socket.join(gameId)
        socket.to(gameId).emit('receiveMessage', { userName: name, message: ' joined!' });
    })

    socket.on('sendMessage', (data) => {
        delete data.token
        socket.to(data.gameId).emit('receiveMessage', {...data, userName: name });
    });

    socket.on('leaveGame', () => {
    })
}

module.exports = socketHandler