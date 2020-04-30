/**
 * Models
 * 
*/
const Database = use('Database')
const Match = use("App/Models/Match")

/**
 * Domains
 * 
*/
const UserDomain = use('App/Domain/UserDomain')
const QuestionDomain = use('App/Domain/QuestionDomain')

/**
 * General
 * 
*/
const CodeGenerator = use("App/Helpers/CodeGenerator")
const Time = use("App/Helpers/Time")
const SocketEvents = use('App/Enum/SocketEvents')
const MatchStatus = use('App/Enum/MatchStatus')


/**
 * Constants
 * All times are in MS
*/
const TOTAL_ROUNDS = 5;
const ROUND_COUNTDOWN_TIME = 5;

const TIME_BEFORE_START_MATCH = 1000;
const TIME_BEFORE_START_FIRST_ROUND = 3500;
const TIME_BEFORE_SEND_QUESTION = 4000;
const TIME_BEFORE_COUNTDOWN = 1000;
const TIME_BEFORE_NEW_ROUND = 3000;

const TIME_BEFORE_MATCH_PLAY_AGAIN = 3000;
const MATCH_PLAY_AGAIN_COUNTDOWN_TIME = 5;

/**
 * 
 * PUBLICS
 * 
*/

/**
 * Set player as ready in a match
 *
 * @param {string} username
*/
module.exports.setReady = async (room, userId, matchId) => {

  let match = await module.exports.getMatchById(matchId);

  match.merge({
    [match.owner_id == userId ? "owner_isReady" : "opponent_isReady"]: true
  });

  match.save();

  room.emit(SocketEvents.SERVER_PLAYER_READY, { userId: userId });

  if (match.owner_isReady && match.opponent_isReady) {
    await Time.waitMS(TIME_BEFORE_START_MATCH);

    startMatch(room, matchId);
  }
}

/**
 * Saves the user socket id and return match players
 *
 * @param {integer} matchId
*/
module.exports.joinMatch = async (room, matchId, userId) => {
  const matchPlayers = {};
  const getRolesPromises = [];

  const match = await module.exports.getMatchById(matchId);

  const getOwnerPromise = await match.owner().fetch().then((owner) => matchPlayers.owner = {
    id: owner.id,
    login: owner.username,
    name: owner.name,
    avatar: owner.image_url,
    repos: owner.repos_quantity
  });

  getRolesPromises.push(getOwnerPromise);

  if (match.opponent_id) {
    const getOpponentPromise = await match.opponent().fetch().then((opponent) => matchPlayers.opponent = {
      id: opponent.id,
      login: opponent.username,
      name: opponent.name,
      avatar: opponent.image_url,
      repos: opponent.repos_quantity
    });

    getRolesPromises.push(getOpponentPromise);
  }

  await Promise.all(getRolesPromises);

  room.emit(SocketEvents.SERVER_PLAYER_JOINED, matchPlayers);

  UserDomain.setUserSocketId(userId, room.socketId);
}

/**
 * Create a new match to User with userId
 *
 * @param {integer} userId
*/
module.exports.createMatch = async (userId) => {
  let existingUser = await UserDomain.getUserById(userId);
  if (!existingUser) {
    return {
      "errorCode": 1,
      "message": "This user doesn't exists!"
    }
  }

  const createdMatch = await Match.create({
    code: CodeGenerator.generateCode(),
    owner_id: userId,
    status: MatchStatus.PRISTINE
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
  let existingUser = await UserDomain.getUserById(userId);
  if (!existingUser) {
    return {
      "errorCode": 1,
      "message": "This user doesn't exists!"
    }
  }

  let existingMatch = await Match.findBy('code', matchCode);
  if (!existingMatch) {
    return {
      "errorCode": 3,
      "message": "This room doesn't exists!"
    };
  }

  if (existingMatch.owner_id == userId) {
    return {
      "errorCode": 7,
      "message": "You cannot join your own room!"
    };
  }

  if (existingMatch.opponent_id) {
    return {
      "errorCode": 4,
      "message": "This room is full!"
    };
  }

  if ([MatchStatus.PRISTINE, MatchStatus.ENDED].indexOf(existingMatch.status) == -1) {
    return {
      "errorCode": 5,
      "message": "This room is already started!"
    };
  }

  if (existingMatch.status == MatchStatus.ENDED) {
    return {
      "errorCode": 6,
      "message": "This room is already over!"
    };
  }

  existingMatch.merge({
    opponent_id: userId,
    status: MatchStatus.LOBBY
  });

  await existingMatch.save();

  return {
    matchId: existingMatch.id
  };
};

/**
 * Answer a question in a match, check the answer, calculate and persits points to match
 *
 * @param {integer} userId
 * @param {integer} matchId
 * @param {integer} questionId
 * @param {integer} answer
 * @param {integer} time
*/
module.exports.answerQuestion = async (userId, matchId, questionId, answer, time) => {

  const [match, question] = await Promise.all([module.exports.getMatchById(matchId), QuestionDomain.getById(questionId)]);

  const isMatchOwner = match.owner_id == userId;

  const playerOldScore = match[isMatchOwner ? "owner_score" : "opponent_score"];
  const rightAnswerScore = question.correct_answer == answer ? 5 : 0;
  const score = playerOldScore + rightAnswerScore + (rightAnswerScore > 0 ? (time || 0) : 0);

  match.merge({
    [isMatchOwner ? "owner_last_answer" : "opponent_last_answer"]: answer,
    [isMatchOwner ? "owner_score" : "opponent_score"]: score,
  })

  match.save();
}

/**
 * Disconnect socket from user
 *
 * @param {object} room
*/
module.exports.disconnectUserFromMatch = async (socketId) => {
  const user = await UserDomain.getUserBySocketId(socketId);
  if (user) {
    UserDomain.setUserSocketId(user.id, "");

    const matches = await Database.table('matches').whereRaw(`(owner_id = ? || opponent_id = ?)`, [user.id, user.id]).orderBy('id', 'desc');

    if (matches && matches[0]) {
      const match = await module.exports.getMatchById(matches[0].id);
      const isMatchOwner = user.id == match.owner_id;

      if (match.status == MatchStatus.PLAYING) {
        match.merge({
          [isMatchOwner ? "owner_disconnected" : "opponent_disconnected"]: true,
          status: MatchStatus.DISCONNECTED
        });

        match.save();
      }
    }
  }
}

/**
 * Register if user wants to play again
 *
 * @param {integer} userId
 * @param {integer} matchId
*/
module.exports.playAgainAnswer = async (userId, matchId) => {
  const match = await module.exports.getMatchById(matchId);
  const isMatchOwner = match.owner_id == userId;

  match.merge({
    [isMatchOwner ? "owner_play_again" : "opponent_play_again"]: true
  })

  match.save();
}

/**
 * Get match by id
 *
 * @param {string} matchId
*/
module.exports.getMatchById = async (matchId) => {
  const match = await Match.findBy('id', matchId);
  return match;
}




/**
 * 
 * PRIVATES
 * 
*/

/**
 * Starts a match and play the first round
 *
 * @param {object} room
 * @param {integer} matchId
*/
const startMatch = async (room, matchId) => {
  room.emit(SocketEvents.SERVER_MATCH_START);

  await Time.waitMS(TIME_BEFORE_START_FIRST_ROUND);

  playNextRound(room, matchId);
}

/**
 * Starts the next round of a match, or ends it according TOTAL_ROUNDS
 * 
 * @param {object} room
 * @param {integer} matchId
*/
const playNextRound = async (room, matchId) => {
  let match = await module.exports.getMatchById(matchId);

  if (match.round == TOTAL_ROUNDS) {
    endMatch(room, matchId);
    return;
  }

  const question = await QuestionDomain.getRandomQuestion((match.last_questions || "").split(','));
  const round = match.round + 1;

  match.merge({
    status: MatchStatus.PLAYING,
    round: round,
    owner_last_answer: 0,
    opponent_last_answer: 0,
    last_questions: !match.last_questions ? question.id.toString() : `${match.last_questions},${question.id.toString()}`
  });

  match.save();

  room.emit(SocketEvents.SERVER_MATCH_START_ROUND, { currentRound: match.round, totalRound: TOTAL_ROUNDS });

  await Time.waitMS(TIME_BEFORE_SEND_QUESTION);

  room.emit(SocketEvents.SERVER_MATCH_START_QUESTION, {
    id: question.id,
    title: question.title,
    image: question.image,
    answer1: question.answer1,
    answer2: question.answer2,
    answer3: question.answer3,
    answer4: question.answer4
  });

  await Time.waitMS(TIME_BEFORE_COUNTDOWN);

  let userDisconnected = false;

  await Time.countdownFrom(ROUND_COUNTDOWN_TIME, async (counted, stopCounting) => {
    room.emit(SocketEvents.SERVER_MATCH_COUNTDOWN, { seconds: counted });

    match = await module.exports.getMatchById(matchId);

    if (match.owner_disconnected || match.opponent_disconnected) {
      userDisconnected = true;
      return;
    }

    if (match.owner_last_answer && match.opponent_last_answer) {
      stopCounting();
    }
  });

  match = await module.exports.getMatchById(matchId);

  room.emit(SocketEvents.SERVER_MATCH_END_ROUND, {
    owner: {
      id: match.owner_id,
      answer: match.owner_last_answer,
      score: match.owner_score
    },
    opponent: {
      id: match.opponent_id,
      answer: match.opponent_last_answer,
      score: match.opponent_score
    },
    correctAnswer: question.correct_answer
  });

  await Time.waitMS(TIME_BEFORE_NEW_ROUND);

  if (userDisconnected) {
    endMatch(room, matchId);
    return;
  }

  playNextRound(room, matchId);
}

/**
 * Ends the match and calculate and persist players statistics
 *
 * @param {object} room
 * @param {integer} matchId
*/
const endMatch = async (room, matchId) => {
  const match = await module.exports.getMatchById(matchId);

  const [owner, opponent] = await Promise.all([match.owner().fetch(), match.opponent().fetch()]);

  const isTied = match.owner_score == match.opponent_score;
  const ownerHasWinned = match.owner_score > match.opponent_score;
  const someoneScored = match.owner_score > 0 || match.opponent_score > 0;
  const ownerScore = owner.score + match.owner_score;
  const opponentScore = opponent.score + match.opponent_score;

  if (!match.owner_disconnected) {
    if (someoneScored) {

      owner.merge({
        score: ownerScore,
      });

      if (isTied) {
        owner.merge({
          ties: owner.ties + 1,
        });
      } else {
        owner.merge({
          wins: owner.wins + (ownerHasWinned ? 1 : 0),
        });

        if (!match.opponent_disconnected) {
          owner.merge({
            losses: owner.losses + (!ownerHasWinned ? 1 : 0),
          })
        }
      }
    }
  } else {
    owner.merge({
      losses: owner.losses + 1
    });
  }

  if (!match.opponent_disconnected) {
    if (someoneScored) {

      opponent.merge({
        score: opponentScore,
      });

      if (isTied) {
        opponent.merge({
          ties: opponent.ties + 1,
        });
      } else {
        opponent.merge({
          wins: opponent.wins + (ownerHasWinned ? 0 : 1)
        });

        if (!match.owner_disconnected) {
          opponent.merge({
            losses: opponent.losses + (!ownerHasWinned ? 0 : 1)
          });
        }
      }
    }
  } else {
    opponent.merge({
      losses: opponent.losses + 1
    });
  }


  if (someoneScored && !isTied) {
    if (!match.owner_disconnected && !match.opponent_disconnected) {
      match.merge({
        winner_id: ownerHasWinned ? owner.id : opponent.id,
      });
    }
  }

  if (match.status != MatchStatus.DISCONNECTED) {
    match.merge({
      status: MatchStatus.ENDED
    });
  }

  owner.save();
  opponent.save();
  match.save();

  room.emit(SocketEvents.SERVER_MATCH_END, {
    owner: {
      id: match.owner_id,
      score: ownerScore,
      wins: owner.wins,
      losses: owner.losses,
      ties: owner.ties,
      lastMatchScore: match.owner_score,
      winned: someoneScored && !isTied && ownerHasWinned,
      disconnected: match.owner_disconnected,
    },
    opponent: {
      id: match.opponent_id,
      score: opponentScore,
      wins: opponent.wins,
      losses: opponent.losses,
      ties: opponent.ties,
      lastMatchScore: match.opponent_score,
      winned: someoneScored && !isTied && !ownerHasWinned,
      disconnected: match.opponent_disconnected,
    }
  });

  await Time.waitMS(TIME_BEFORE_MATCH_PLAY_AGAIN);

  playAgain(room, matchId);
}

/**
 * Countdown from 10 seconds to 0 and wait players response if they want to play again
 *
 * @param {object} room
 * @param {integer} matchId
*/
const playAgain = async (room, matchId) => {
  let match = await module.exports.getMatchById(matchId);
  let newMatch;

  await Time.countdownFrom(MATCH_PLAY_AGAIN_COUNTDOWN_TIME, async (counted, stopCounting) => {
    room.emit(SocketEvents.SERVER_MATCH_PLAY_AGAIN_COUNTDOWN, { seconds: counted });

    match = await module.exports.getMatchById(matchId);

    if (match.owner_play_again && match.opponent_play_again) {
      stopCounting();
    }
  });

  if (match.owner_play_again) {
    newMatch = await module.exports.createMatch(match.owner_id);
    room.emit(SocketEvents.SERVER_MATCH_PLAY_AGAIN, { userId: match.owner_id, matchId: newMatch.matchId, matchCode: newMatch.matchCode });
  }

  if (match.opponent_play_again) {
    if (newMatch) {
      newMatch = await module.exports.joinMatchWithCode(newMatch.matchCode, match.opponent_id);
    } else {
      newMatch = await module.exports.createMatch(match.opponent_id);
    }

    room.emit(SocketEvents.SERVER_MATCH_PLAY_AGAIN, { userId: match.opponent_id, matchId: newMatch.matchId, matchCode: newMatch.matchCode });
  }

  room.leave();
}