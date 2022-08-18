const express = require('express')

const {
    startGame,
} = require('../controllers/gameplay-controller')

const router = express.Router()

router.route('/start').post(startGame);

module.exports = router