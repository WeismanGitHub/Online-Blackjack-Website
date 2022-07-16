const express = require('express')
const {
    getGame,
    createGame,
    joinGame,
    leaveGame
} = require('../controllers/game-controller')

const router = express.Router()

router.route('/:gameId').get(getGame);

router.route('/create').post(createGame);
//no leave route because once every player leaves the game it's deleted

router.route('/join').post(joinGame);
router.route('/leave').post(leaveGame);

module.exports = router