const UserSchema = require('../schemas/user-schema')
const GameSchema = require('../schemas/game-schema')
const { removePlayerFromGame } = require('../helpers')
const { StatusCodes } = require('http-status-codes')

const createGame = async (req, res) => {
    try {
        const userId = req.user._id
        const game = await GameSchema.create({ creatorId: userId })
        
        await UserSchema.updateOne({ _id: userId }, { gameId: game._id })
    
        res.status(StatusCodes.CREATED)
        .cookie('gameId', game._id)
        .redirect('/game')
    } catch(err) {
        if (err.message.includes('duplicate key error collection')) {
            const gameId = await UserSchema.findById(userId).select('-_id gameId')

            res.status(StatusCodes.CONFLICT)
            .cookie('gameId', gameId.gameId)
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
            const gameId = await UserSchema.findById(userId).select('-_id gameId')
            await removePlayerFromGame(gameId, req.user._id)
        } else if (err.message.includes('Cast to ObjectId failed')) {
            throw new Error("Game Id doesn't exist.")
        }
    })

    if (updateData.modifiedCount) {
        res.status(StatusCodes.OK)
        .cookie('gameId', gameId)
        .redirect('/game')
    } else {
        throw new Error('Please leave your current game.')
    }
}

const leaveGame = async (req, res) => {
    await removePlayerFromGame(req.cookies.gameId, req.user._id)

    res.status(StatusCodes.OK)
    .clearCookie('gameId')
    .redirect('/')
}

const getGame = async (req, res) => {
    const game = await GameSchema.findById(req.cookies.gameId).lean()

    res.status(StatusCodes.OK)
    .json({ game: game })
}

module.exports = { createGame, getGame, joinGame, leaveGame }