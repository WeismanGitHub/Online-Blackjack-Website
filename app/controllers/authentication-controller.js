const UserSchema = require('../schemas/user-schema')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    const user = await UserSchema.create(req.body)
    .catch(err => {
        if (err.message.includes('uplicate key error collection')) {
            throw new Error('Name must be unique.')
        } else if (err.message.includes('is shorter than the minimum allowed')) {
            throw new Error('Password must be between 6 and 50 characters.')
        }

        throw new Error(err.message)
    })

    const token = user.createJWT()
    
    res.status(StatusCodes.CREATED)
    .cookie('token', token)
    .json({ error: false})
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
    .json({ error: false })
}

const logout = (req, res) => {
    res.status(StatusCodes.OK)
    .clearCookie("token")
    .redirect('/authentication')
}

module.exports = { login, register, logout }