const CardSchema = require('./card-schema')
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, '[Server Error] Please provide a user id.'],
        unique: true
    },
    hand: [CardSchema],
    playerStage: {
        type: String,
        enum: ['Lobby', 'Initial Betting', 'Initial Dealing', 'First Betting', 'Second Dealing'],
        default: 'Lobby'
    }
}, { _id : false })

module.exports = PlayerSchema