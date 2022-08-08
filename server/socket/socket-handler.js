const GameSchema = require('../schemas/game-schema')
const UserSchema = require('../schemas/user-schema')

function socketHandler(socket) {
    const { name, _id } = socket.user

    console.log('test')
    
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