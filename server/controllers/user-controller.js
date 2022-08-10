const UserSchema = require('../schemas/user-schema')
const { removePlayerFromGame } = require('../helpers')
const { StatusCodes } = require('http-status-codes')

const updateUser = async (req, res) => {
    const { name, password } = req.body
    //If a password or name is entered then it's added to updateObject.
    const updateObject = { ...password && { password: password }, ...name && { name: name } }

    if (Object.keys(updateObject).length) {
        const user = await UserSchema.findByIdAndUpdate(
            req.user._id,
            updateObject,
            { new: true }
        )
    
        const token = user.createJWT()
    
        res.status(StatusCodes.OK)
        .cookie('token', token, { expires : new Date(Date.now() + 999999*999999) })
        .json({ message: 'Updated user!'})
    } else {
        throw new Error('Nothing updated!')
    }
}

const deleteUser = async (req, res) => {
    const userId = req.user._id
    const game = await UserSchema.findById(userId).lean().select('-_id gameId')

    if (game && Object.keys(game).length) {
        await removePlayerFromGame(game.gameId, userId)
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