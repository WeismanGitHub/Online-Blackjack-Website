const { login, register, logout} = require('../controllers/authentication-controller')
const authenticationMiddleware = require('../middleware/authentication-middleware')
const express = require('express')

const router = express.Router()

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(authenticationMiddleware, logout);

module.exports = router;