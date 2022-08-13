const express = require('express')

const {
    updateUser,
    deleteUser,
    getUser,
    addUserIcon,
    removeUserIcon,
    getUserIcon,
} = require('../controllers/user-controller')

const router = express.Router()

router.route('/update').post(updateUser);
router.route('/delete').post(deleteUser);
router.route('/:userId?').get(getUser)

router.route('/icon/add').post(addUserIcon)
router.route('icon/remove').post(removeUserIcon)
router.route('/icon/:iconId?').get(getUserIcon)

module.exports = router