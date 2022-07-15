const { updateAccount, deleteAccount } = require('../controllers/account-controller')
const express = require('express')

const router = express.Router()

router.route('/update').post(updateAccount);
router.route('/delete').post(deleteAccount);

module.exports = router