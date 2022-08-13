const express = require('express')

const {
    updateUser,
    deleteUser,
    getUser,
    addProfileIcon,
    removeProfileIcon,
} = require('../controllers/user-controller')

const router = express.Router()

router.route('/update').post(updateUser);
router.route('/delete').post(deleteUser);
router.route('/addIcon').post(addProfileIcon)
router.route('removeIcon').post(removeProfileIcon)
router.route('/:userId?').get(getUser)

module.exports = router