const GameSchema = require('./schemas/game-schema')
const UserSchema = require('./schemas/user-schema')

async function removePlayerFromGame(gameId, userId) {
    const game = await GameSchema.findOneAndUpdate(
        { _id: gameId },
        { $pull: { players: { userId: userId } } },
        { new: true }
    ).select('-_id players').lean()

    if (!game) {
        throw new Error("Game doesn't exist.")
    }

    if (!game.players.length) {
        await GameSchema.deleteOne( { _id: gameId })
    }
    
    await UserSchema.updateOne(
        { _id: userId },
        { $unset: { gameId: "" } }
    )
}

async function getAllUsersInGame(gameId) {
    const players = (await GameSchema.findById(gameId).select('-_id players').lean())?.players
    
    if (!players) {
        throw new Error('Game has been deleted.')
    }

    const userPromises = players.map(player => UserSchema.findById(player.userId).select('-password').lean())
    return await Promise.all(userPromises)
}

module.exports = {
    removePlayerFromGame,
    getAllUsersInGame,
}