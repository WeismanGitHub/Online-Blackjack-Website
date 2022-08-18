const { removePlayerFromGame, getAllUsersInGame } = require('../helpers')
const UserSchema = require('../schemas/user-schema')
const GameSchema = require('../schemas/game-schema')
const { StatusCodes } = require('http-status-codes')

const createGame = async (req, res) => {
    const userId = req.user._id
    
    try {
        const game = await GameSchema.create({ creatorId: userId })
        
        await UserSchema.updateOne({ _id: userId }, { gameId: game._id })
    
        res.status(StatusCodes.CREATED)
        .cookie('gameId', game._id, { expires : new Date(Date.now() + 999999*999999) })
        .redirect('/game')
    } catch(err) {
        if (err.message.includes('duplicate key error collection')) {
            const gameId = await UserSchema.findById(userId).select('-_id gameId')

            res.status(StatusCodes.CONFLICT)
            .cookie('gameId', gameId.gameId, { expires : new Date(Date.now() + 999999*999999) })
            .redirect('/game')
        } else {
            throw new Error(err.message)
        }
    }
}

const joinGame = async (req, res) => {
    const gameId = req.body.gameId
    const userId = req.user._id

    const updateData = await GameSchema.updateOne(
        { _id: gameId },
        { $addToSet: { players: { userId: userId } } },
    ).catch(async err => {
        if (err.message.includes('duplicate')) {
            await removePlayerFromGame(gameId, req.user._id)
        } else if (err.message.includes('Cast to ObjectId failed')) {
            throw new Error("Game Id doesn't exist.")
        }
    })

    
    if (updateData.modifiedCount) {
        await UserSchema.updateOne({ _id: userId }, { gameId: gameId })

        res.status(StatusCodes.OK)
        .cookie('gameId', gameId, { expires : new Date(Date.now() + 999999*999999) })
        .redirect('/game')
    } else {
        throw new Error('That game Id is invalid or you are already in a game.')
    }
}

const leaveGame = async (req, res) => {
    await removePlayerFromGame(req.cookies.gameId, req.user._id)

    res.status(StatusCodes.OK)
    .clearCookie('gameId')
    .redirect('/')
}

const getAllPlayers = async (req, res) => {
    const users = await getAllUsersInGame(req.cookies.gameId)
    
    res.status(StatusCodes.OK)
    .send(users)
}

module.exports = {
    createGame,
    getAllPlayers,
    joinGame,
    leaveGame,
}