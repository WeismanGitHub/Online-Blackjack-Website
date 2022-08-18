const UserSchema = require('../schemas/user-schema')
const GameSchema = require('../schemas/game-schema')
const { StatusCodes } = require('http-status-codes')

const startGame = async (req, res) => {
    res.status(StatusCodes.OK)
    .send()
}

module.exports = {
    startGame,
}