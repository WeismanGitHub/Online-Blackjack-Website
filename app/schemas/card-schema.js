const mongoose = require('mongoose');

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
const suits = ['Heart', 'Club', 'Spade', 'Diamond']

const CardSchema = new mongoose.Schema({
    suit: {
        type: String,
        enum: suits,
        required: [true, '[Server Error] Please provide a suit'],
    },
    value: {
        type: Number,
        enum: [...Array(12).keys()].slice(2)
    },
    rank: {
        type: String,
        required: [true, '[Server Error] Please provide a rank'],
        enum: ranks
    },
    color: {
        type: String,
        enum: ['Red', 'Black']
    }
})

module.exports = CardSchema