const GameSchema = require('../schemas/game-schema')
const UserSchema = require('../schemas/user-schema')
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function socketHandler(socket) {
    const token = cookie.parse(socket.handshake.headers.cookie).token
    const { name, _id } = jwt.verify(token, process.env.JWT_SECRET)
    
    socket.on('joinGame', async (data) => {
        const gameId = data.gameId
        socket.join(gameId)

        const players = (await GameSchema.findOne({ gameId: gameId }).select('-_id players').lean()).players
        socket.to(gameId).emit('receiveMessage', { userName: name, message: ' joined!' });
    })

    socket.on('getAllPlayers', async (data) => {
        const gameId = data.gameId

        const players = (await GameSchema.findOne({ gameId: gameId }).select('-_id players').lean()).players
        const playerPromises = players.map(player => UserSchema.findById(player.userId).select('name').lean())

        Promise.all(playerPromises).then(players => {
            socket.to(gameId).emit('sendAllPlayers', players)
        })
    })

    socket.on('sendMessage', (data) => {
        delete data.token
        socket.to(data.gameId).emit('receiveMessage', {...data, userName: name });
    });

    socket.on('leaveGame', (data) => {
        const gameId = data.gameId
        socket.leave(gameId)
        delete data.token
        socket.to(gameId).emit('receiveMessage', { userName: name, message: 'Left!' })
    })
}

module.exports = socketHandler