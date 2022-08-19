const { removePlayerFromGame } = require('../helpers')
const UserSchema = require('../schemas/user-schema')
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
        ).select('name balance userIconId')

        const token = user.createJWT()

        res.status(StatusCodes.OK)
        .cookie('token', token, { expires : new Date(Date.now() + 999999*999999) })
        .json({ user: user })
    } else {
        throw new Error('Nothing updated!')
    }
}

const deleteUser = async (req, res) => {
    const userId = req.user._id
    const game = await UserSchema.findById(userId).select('-_id gameId').lean()

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
    const user = await UserSchema.findById(req.params.userId || req.user._id).select('-_id name iconId balance').lean()

    if (!user) throw new Error('User does not exist.')

    res.status(StatusCodes.OK)
    .json({ user: user })
}

const addUserIcon = async (req, res) => {
    const allowedMimeTypes = ['image/jpeg']
    const userIconId = (await UserSchema.findById(req.user._id).select('-_id iconId')).iconId
    console.log(userIconId)
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../user-icons');
        },
        fileFilter: (req, file, cb) => {
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error('File must be a jpeg.'));
            }
        },
        filename: async function (req, file, cb) {
            cb(null, userIconId + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage, limits: { fileSize: 2000000 }});
    upload.single('icon')

    res.status(StatusCodes.OK).end()
}

const removeUserIcon = async (req, res) => {
    const userIconId = await UserSchema.findById(req.user._Id).iconId

    await fs.unlink(path.join(__dirname, '..', 'user-icons', `${userIconId}.jpg`))
    .catch(err => {
        throw new Error('Error deleting file.')
    })

    res.status(StatusCodes.OK).end()
}

const getUserIcon = async (req, res) => {
    const userIconId = req.params.iconId || (await UserSchema.findById(req.user._id).select('-_id iconId').lean()).iconId

    fs.access(path.resolve(__dirname, `../user-icons/${userIconId}.jpeg`), async (err) => {
        if (!err) {
            return await res.status(StatusCodes.OK).sendFile(path.resolve(__dirname, `../user-icons/${userIconId}.jpeg`))
        }

        fs.access(path.resolve(__dirname, `../user-icons/${userIconId}.jpg`), async (err) => {
            if (!err) {
                return await res.status(StatusCodes.OK).sendFile(path.resolve(__dirname, `../user-icons/${userIconId}.jpg`))
            }
    
            res.status(StatusCodes.OK).sendFile(path.resolve(__dirname, '../user-icons/default.png'))
        })
    })
    
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    addUserIcon,
    removeUserIcon,
    getUserIcon,
}