const express = require('express')
const {
    getAllPlayers,
    createGame,
    joinGame,
    leaveGame
} = require('../controllers/game-controller')

const router = express.Router()

router.route('/players').get(getAllPlayers);

router.route('/create').post(createGame);
//no leave delete because once every player leaves the game it's deleted

router.route('/join').post(joinGame);
router.route('/leave').post(leaveGame);

module.exports = router