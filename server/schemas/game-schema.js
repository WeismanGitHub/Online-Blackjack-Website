const PlayerSchema = require('./player-schema')
const CardSchema = require('./card-schema')
const shuffle = require('shuffle-array')
const mongoose = require('mongoose');

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
const suits = ['Heart', 'Club', 'Diamond', 'Spade']

//do a log of every game played and associate it with players? idk
const GameSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Types.ObjectId, unique: true},
    deck: [CardSchema],
    gameStage: {
        type: String,
        enum: ['Lobby', 'Initial Betting', 'Initial Dealing', 'First Betting', 'Second Dealing'],
        default: 'Lobby'
    },
    players: [{
        type: PlayerSchema,
        maxlength: [6, 'Max Players: 6'],
    }]
})

GameSchema.pre('save', function() {
    for (let rank of ranks) {
        for (let [index, suit] of suits.entries()) {
            let value;

            if (parseInt(rank)) {
                value = parseInt(rank)
            } else if (rank == 'Ace') {
                value = 11
            } else {
                value = 10
            }

            this.deck.push({
                rank: rank,
                suit: suit,
                value: value,
                color: index % 2 === 0 ? 'Red' : 'Black'
            })
        }
    }

    this.players.push({ userId: this.creatorId })
    this.deck = shuffle(this.deck)
})

GameSchema.methods.checkValue = function() {
    for (let player of this.game.players) {
        const totalPoints = 0
        const amountOfAces = 0;

        for (let card of player.hand) {
            totalPoints += card.value

            amountOfAces += card.value == 11 ? 1 : 0
        }

        for (let i = 0; i<=amountOfAces; i++) {
            if (totalPoints > 21) {
                aceIndex = player.hand.findIndex((card => card.value == 11))
                this.game.player.hand[aceIndex].value = 1
            }
        }
    }
}

GameSchema.methods.shuffleCards = function() {
    this.deck = shuffle(this.deck)
}

GameSchema.methods.dealCards = function() {
    for (let player of this.players) {
        player.hand.push(this.cards[0])
        this.cards.splice(0, 1)
        player.hand.push(this.cards[0])
        this.cards.splice(0, 1)
    }
}

module.exports = mongoose.model('games', GameSchema);