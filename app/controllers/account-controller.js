const UserSchema = require('../schemas/user-schema')
const { StatusCodes } = require('http-status-codes')

const updateAccount = async (req, res) => {
    console.log(req.body)

    const user = await UserSchema.findByIdAndUpdate(
        req.user._id,
        req.body
    ).select('name')

    const token = user.createJWT()

    res.status(StatusCodes.OK)
    .cookie('token', token)
    .send({ name: user.name })
}

module.exports = {
    updateAccount
}