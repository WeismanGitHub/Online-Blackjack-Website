const UserSchema = require('../schemas/user-schema')
const { removePlayerFromGame } = require('../helpers')
const { StatusCodes } = require('http-status-codes')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

const addProfileIcon = async (req, res) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp']
    const profileIconId = await UserSchema.findById(req.user._Id).profileIcon._id

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../profile-icons');
        },
        fileFilter: (req, file, cb) => {
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error('File must be a webp, jpeg, or png.'));
            }
        },
        filename: async function (req, file, cb) {
            cb(null, profileIconId + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage, limits: { fileSize: 2000000 }});
    upload.single('icon')

    res.status(StatusCodes.OK).end()
}

const removeProfileIcon = async (req, res) => {
    const profileIconId = await UserSchema.findById(req.user._Id).profileIcon._id

    await fs.unlink(path.join(__dirname, '..', 'profile-icons', `${profileIconId}.jpg`))
    .catch(err => {
        throw new Error('Error deleting file.')
    })

    res.status(StatusCodes.OK).end()
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    addProfileIcon,
    removeProfileIcon
}