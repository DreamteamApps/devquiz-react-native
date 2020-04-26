const Match = use("App/Models/Match")
const User = use("App/Models/User")

const CodeGenerator = use("App/Helpers/CodeGenerator")

/**
 * Set player as ready in a match
 *
 * @param {string} username
*/
module.exports.setReady = (userId, matchId) => {
    return new Promise(async (resolve) => {
        let existingMatch = await Match.findBy('id', matchId);

        existingMatch.merge({
            [existingMatch.owner_id == userId ? "owner_isReady" : "opponent_isReady"] : true
        });
        
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

/**
 * Get the pleayers of match by matchId
 *
 * @param {integer} matchId
*/
module.exports.getMatchPlayers = async (matchId) => {
    return Match.findBy('id', matchId).then((existingMatch) => {
        const getRolesPromises = [];
        var matchPlayers = {};

        const getOwnerPromise = User.findBy('id', existingMatch.owner_id).then((owner) => matchPlayers.owner = {
            id: owner.id,
            login: owner.username,
            name: owner.name,
            avatar: owner.image_url,
            repos: owner.repos_quantity
        });

        getRolesPromises.push(getOwnerPromise);

        if (existingMatch.opponent_id) {
            const getOpponentPromise = User.findBy('id', existingMatch.opponent_id).then((opponent) => matchPlayers.opponent = {
                id: opponent.id,
                login: opponent.username,
                name: opponent.name,
                avatar: opponent.image_url,
                repos: opponent.repos_quantity
            });

            getRolesPromises.push(getOpponentPromise);
        }

        return Promise.all(getRolesPromises).then(()=> matchPlayers);
    });
}

/**
 * Create a new match to User with userId
 *
 * @param {integer} userId
*/
module.exports.createMatch = async (userId) => {
    let existingUser = await User.findBy('id', userId);
    if(!existingUser) {
      return {
        "errorCode": 1,
        "message": "This user doesn't exists!"
      }
    }

    const createdMatch = await Match.create({
      code: CodeGenerator.generateCode(),
      owner_id: userId,
      status: "pristine"
    });
    
    return {
      matchId: createdMatch.id,
      matchCode: createdMatch.code 
    };
};

/**
 * Join player in a match with userId and matchCode
 *
 * @param {integer} matchCode
 * @param {integer} userId
*/
module.exports.joinMatchWithCode = async (matchCode, userId) => {
    let existingUser = await User.findBy('id', userId);
    if(!existingUser) {
      return {
        "errorCode": 1,
        "message": "This user doesn't exists!"
      }
    }

    let existingMatch = await Match.findBy('code', matchCode);
    if(!existingMatch) {
      return {
        "errorCode": 3,
        "message": "This room doesn't exists!"
      };
    } 

    if(existingMatch.owner_id == userId) {
      return {
        "errorCode": 7,
        "message": "You cannot join your own room!"
      };
    }

    if(existingMatch.opponent_id) {
      return {
        "errorCode": 4,
        "message": "This room is full!"
      };
    }

    if(['pristine', 'ended'].indexOf(existingMatch.status) == -1) {
      return {
        "errorCode": 5,
        "message": "This room is already started!"
      };
    }

    if(existingMatch.status == 'ended') {
      return {
        "errorCode": 6,
        "message": "This room is already over!"
      };
    }

    existingMatch.merge({
      opponent_id : userId,
      status: 'opponent_joined'
    });

    await existingMatch.save();
    
    return {
      matchId: existingMatch.id
    };
};
