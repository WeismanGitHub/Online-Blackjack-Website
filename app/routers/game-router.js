const { getGame, createGame, joinGame } = require('../controllers/game-controller')
const express = require('express')

const router = express.Router()

router.route('/:gameId').get(getGame);
router.route('/create').post(createGame);
router.route('/join').post(joinGame);

module.exports = router