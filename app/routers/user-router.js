const { updateUser, deleteUser } = require('../controllers/user-controller')
const express = require('express')

const router = express.Router()

router.route('/update').post(updateUser);
router.route('/delete').post(deleteUser);

module.exports = router