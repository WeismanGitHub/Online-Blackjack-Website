const express = require('express')

const {
    updateUser,
    deleteUser,
    getUser,
    addProfileIcon,
} = require('../controllers/user-controller')

const router = express.Router()

router.route('/update').post(updateUser);
router.route('/delete').post(deleteUser);
router.route('/addIcon').post(addProfileIcon)
router.route('/:userId').post(getUser);

module.exports = router