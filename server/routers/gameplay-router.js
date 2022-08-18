const express = require('express')

const {
    startGame,
} = require('../controllers/game-controller')

const router = express.Router()

router.route('/start').get(startGame);

module.exports = router