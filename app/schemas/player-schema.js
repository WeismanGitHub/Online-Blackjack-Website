const CardSchema = require('./card-schema')
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Types.ObjectId,
        required: [true, '[Server Error] Please provide a user id.'],
    },
    hand: [CardSchema],
    playerStage: {
        type: String,
        enum: ['Initial Betting', 'Initial Dealing', 'First Betting', 'Second Dealing'],
        default: 'Initial Betting'
    }
})

module.exports = PlayerSchema