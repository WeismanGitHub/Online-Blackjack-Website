const AccountSchema = require('../schemas/account-schema')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    const user = await AccountSchema.create(req.body)
    const token = user.createJWT()

    res.status(StatusCodes.CREATED)
    .cookie('token', token)
    .redirect('/')
}

const login = async (req, res) => {
    const { name, password } = req.body
    const user = await AccountSchema.findOne({ name: name })

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
    .redirect('/')
}

const logout = (req, res) => {
    res.status(StatusCodes.OK)
    .clearCookie("token")
    .redirect('/authentication')
}

module.exports = { login, register, logout }