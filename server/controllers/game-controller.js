const UserSchema = require('../schemas/user-schema')
const GameSchema = require('../schemas/game-schema')
const { StatusCodes } = require('http-status-codes')

const createGame = async (req, res) => {
    const userId = req.user._id
    const game = await GameSchema.create({ creatorId: userId })
    await UserSchema.updateOne({ _id: userId }, { gameId: game._id })

    res.status(StatusCodes.CREATED)
    .cookie('gameId', game._id)
    .redirect('/game')

}

const joinGame = async (req, res) => {
    const updateData = await GameSchema.updateOne(
        { _id: req.body.gameId },
        { $addToSet: { players: { userId: req.user._id } } }
    ).catch(err => {
        throw new Error("Game Id doesn't exist.")
    })

    if (updateData.modifiedCount) {
        res.status(StatusCodes.OK)
        .cookie('gameId', game._id)
        .redirect('/game')
    } else {
        throw new Error("Game Id doesn't exist.")
    }
}

const leaveGame = async (req, res) => {
    const game = await GameSchema.findOneAndUpdate(
        { _id: req.cookies.gameId },
        { $pull: { players: { userId: req.user._id } } }
    ).lean()

    if (!game.players.length) {
        await GameSchema.deleteOne( { _id: req.cookies.gameId })
    }

    await UserSchema.updateOne(
        { _id: req.user._id },
        { $unset: { gameId: "" } }
    )

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