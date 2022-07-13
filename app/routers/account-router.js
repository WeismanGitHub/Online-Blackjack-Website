const { updateAccount } = require('../controllers/account-controller')
const express = require('express')

const router = express.Router()

router.route('/update').post(updateAccount);

module.exports = router
module.exports = router