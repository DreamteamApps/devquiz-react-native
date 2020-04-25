const Match = use("App/Models/Match")

/**
 * Set player as ready in a match
 *
 * @param {string} username
*/
module.exports.setReady = (userId, matchId) => {
    return new Promise(async (resolve) => {
        let existingMatch = await Match.findBy('id', matchId);
        if(existingMatch.owner_id == userId) {
            existingMatch.merge({
                owner_isReady: true
            });
        } else {
            existingMatch.merge({
                opponent_isReady: true
            });
        }
        
        const matchShouldStart = existingMatch.owner_isReady && existingMatch.opponent_isReady;
        if(matchShouldStart) {
            existingMatch.merge({
                status: "game_started"
            });
        }
        
        existingMatch = existingMatch.save();

        resolve(matchShouldStart);
    });
}

