const GameSchema = require('./schemas/game-schema')
const UserSchema = require('./schemas/user-schema')

async function removePlayerFromGame(gameId, userId) {
    const game = await GameSchema.findOneAndUpdate(
        { _id: gameId },
        { $pull: { players: { userId: userId } } },
        { new: true }
    ).select('-_id players').lean()

    if (!game?.players?.length) {
        await GameSchema.deleteOne( { _id: gameId })
    }
    
    await UserSchema.updateOne(
        { _id: userId },
        { $unset: { gameId: "" } }
    )
}

module.exports = {
    removePlayerFromGame
}