const { login, register, logout} = require('../controllers/authentication-controller')
const express = require('express')

const router = express.Router()

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports = router;