const mongoose = require('mongoose');

//make unique 4 character alphanumeric index that can be used to join games instead of full mongodb id call it a code not id
const GameSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Types.ObjectId
    },
    deck: [DeckSchema],
    stage: { type: String, enum: ['Initial Betting', 'Initial Dealing', 'First Betting', 'Second Dealing'] }


})