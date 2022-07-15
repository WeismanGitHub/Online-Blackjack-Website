const AccountSchema = require('../schemas/account-schema')
const { StatusCodes } = require('http-status-codes')

const updateAccount = async (req, res) => {
    const user = await AccountSchema.findOneAndUpdate(
        req.user._id,
        req.body,
        { new: true }
    ).select('-_id')

    const token = user.createJWT()

    res.status(StatusCodes.OK)
    .cookie('token', token)
    .json({ message: 'Updated account!'})
}

const deleteAccount = async (req, res) => {
    //delete from games
}

module.exports = {
    updateAccount,
    deleteAccount,
}