const { getAllUsersInGame } = require('../helpers')
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function socketHandler(socket) {
    const token = cookie.parse(socket.handshake.headers.cookie ?? "").token
    const { name, _id } = jwt.verify(token, process.env.JWT_SECRET)
        
    socket.on('joinGame', async (data) => {
        const gameId = data.gameId
        socket.join(gameId)

        socket.to(gameId).emit('receiveMessage', { userName: name, message: ' joined!' });
    })

    socket.on('updateAllPlayers', async (data) => {
        const gameId = data.gameId
        const users = await getAllUsersInGame(gameId)
        .catch(err => {
            if (err.message == 'Game has been deleted.') {
                return
            } else {
                throw new Error(err.message)
            }
        })

        socket.to(gameId).emit('sendAllPlayers', users)
    })

    socket.on('sendMessage', (data) => {
        delete data.token
        socket.to(data.gameId).emit('receiveMessage', {...data, userName: name });
    });

    socket.on('leaveGame', async (data) => {
        const gameId = data.gameId
        delete data.token
        socket.to(gameId).emit('receiveMessage', { userName: name, message: 'Left!' })
        socket.leave(gameId)
    })
}

module.exports = socketHandler