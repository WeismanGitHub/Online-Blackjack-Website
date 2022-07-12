const UserSchema = require('../schemas/user-schema')
const { StatusCodes } = require('http-status-codes')

const updateAccount = (req, res) => {
    const { name, password } = req.body
    const updateObject = {}

    password ?? (Object.password = password)
    console.log(password)

    if (name) {
        updateObject.name = name
    }

    const user = await UserSchema.findByIdAndUpdate(
        req.user._id,
        updateObject
    )
}

module.exports = {
    updateAccount
}