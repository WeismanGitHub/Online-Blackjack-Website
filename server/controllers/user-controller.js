const UserSchema = require('../schemas/user-schema')
const { removePlayerFromGame } = require('../helpers')
const { StatusCodes } = require('http-status-codes')

const updateUser = async (req, res) => {
    const user = await UserSchema.findOneAndUpdate(
        req.user._id,
        req.body,
        { new: true }
    ).select('-_id')

    const token = user.createJWT()

    res.status(StatusCodes.OK)
    .cookie('token', token)
    .json({ message: 'Updated user!'})
}

const deleteUser = async (req, res) => {
    const gameId = req.cookies.gameId
    const userId = req.user._id

    if (gameId) {
        await removePlayerFromGame(gameId, userId)
    }

    await UserSchema.deleteOne({ _id: userId })

    res.status(StatusCodes.OK)
    .clearCookie('token')
    .clearCookie('gameId')
    .redirect('/authentication')
}

const getUser = async (req, res) => {
    const user = await UserSchema.findById(req.params.userId).lean()

    if (!user) throw new Error('User does not exist.')

    res.status(StatusCodes.OK)
    .json({ user: user })
}
module.exports = {
    updateUser,
    deleteUser,
    getUser,
}