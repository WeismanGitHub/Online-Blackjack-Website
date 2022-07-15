const AccountSchema = require('../schemas/account-schema')
const GameSchema = require('../schemas/game-schema')
const { StatusCodes } = require('http-status-codes')

const createGame = async (req, res) => {
    const userId = req.user._id
    const userIsInAGame = (await AccountSchema.findOne({ _id: userId })).gameId

    if (!userIsInAGame) {
        const game = await GameSchema.create({ creatorId: userId })
        await AccountSchema.updateOne({ _id: userId }, { gameId: game._id })

        res.status(StatusCodes.CREATED)
        .cookie('gameId', game._id)
        .redirect('/game')
    } else {
        throw new Error('Please leave your current game.')
    }
}

const joinGame = async (req, res) => {
    const game = await GameSchema.findOneAndUpdate(
        { _id: req.body.gameId },
        { $addToSet: { players: { accountId: req.user._id } } }
    ).select('_id')

    res.status(StatusCodes.OK)
    .cookie('gameId', game._id)
    .redirect('/game')
}

const leaveGame = async (req, res) => {
    await GameSchema.updateOne(
        { _id: req.cookies.gameId },
        { $pull: { players: { userId: req.user._id } } }
    )

    res.status(StatusCodes.OK)
    clearCookie('gameId')
    .redirect('/')
}

const getGame = async (req, res) => {
}

const deleteGame = async (req, res) => {
}

module.exports = { createGame, getGame, deleteGame, joinGame, leaveGame }