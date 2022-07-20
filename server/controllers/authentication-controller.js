const { removePlayerFromGame } = require('../helpers')
const UserSchema = require('../schemas/user-schema')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    const user = await UserSchema.create(req.body)
    .catch(err => {
        if (err.message.includes('duplicate key error collection')) {
            err.message = 'Name Must be unique.'
        } else if (err.message.includes('validation failed: password:')) {
            err.message = 'Password must be between 6 and 50 characters.'
        } else if (err.message.includes('validation failed: name:')) {
            err.message = 'Name must be between 1 and 15 characters.'
        }
        throw new Error(err.message)
    })

    const token = user.createJWT()

    res.status(StatusCodes.CREATED)
    .cookie('token', token)
    .clearCookie('gameId')
    .redirect('/')
}

const login = async (req, res) => {
    const { name, password } = req.body
    const user = await UserSchema.findOne({ name: name })

    if (!user) {
        throw new Error('Please provide a valid name.')
    }
    
    const PasswordIsCorrect = await user.checkPassword(password)
    
    if (!PasswordIsCorrect) {
        throw new Error('Please provide the correct password.')
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK)
    .cookie('token', token)
    .clearCookie('gameId')
    .redirect('/')
}

const logout = async (req, res) => {
    await removePlayerFromGame(req.cookies.gameId, req.user._id)

    res.status(StatusCodes.OK)
    .clearCookie('token')
    .clearCookie('gameId')
    .redirect('/authentication')
}

module.exports = { login, register, logout }