/**
 * 
 * Models
 * 
*/
const Match = use("App/Models/Match")
const User = use("App/Models/User")
const Question = use("App/Models/Question")




/**
 * 
 * Domains
 * 
*/
const QuestionDomain = use('App/Domain/QuestionDomain')




/**
 * 
 * Helpers
 * 
*/
const CodeGenerator = use("App/Helpers/CodeGenerator")
const Time = use("App/Helpers/Time")




/**
 * 
 * Constants
 * All times are in MS
 * 
*/
const TOTAL_ROUNDS = 6;
const ROUND_COUNTDOWN_TIME = 10;

const TIME_BEFORE_START_MATCH = 1000;
const TIME_BEFORE_START_FIRST_ROUND = 3500;
const TIME_BEFORE_SEND_QUESTION = 4000;
const TIME_BEFORE_COUNTDOWN = 1000;
const TIME_BEFORE_NEW_ROUND = 3000;




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

  let existingMatch = await Match.findBy('id', matchId);

  existingMatch.merge({
    [existingMatch.owner_id == userId ? "owner_isReady" : "opponent_isReady"]: true
  });

  existingMatch.save();

  room.emit('player-ready', { userId: userId });

  if (existingMatch.owner_isReady && existingMatch.opponent_isReady) {
    await Time.waitMS(TIME_BEFORE_START_MATCH);

    startMatch(room, matchId);
  }
}

/**
 * Get the pleayers of match by matchId
 *
 * @param {integer} matchId
*/
module.exports.getMatchPlayers = async (room, matchId) => {
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

    Promise.all(getRolesPromises).then(() => {
      room.emit('player-joined', matchPlayers);
    });
  });
}

/**
 * Create a new match to User with userId
 *
 * @param {integer} userId
*/
module.exports.createMatch = async (userId) => {
  let existingUser = await User.findBy('id', userId);
  if (!existingUser) {
    return {
      "errorCode": 1,
      "message": "This user doesn't exists!"
    }
  }

  const createdMatch = await Match.create({
    code: CodeGenerator.generateCode(),
    owner_id: userId
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

  if (['pristine', 'ended'].indexOf(existingMatch.status) == -1) {
    return {
      "errorCode": 5,
      "message": "This room is already started!"
    };
  }

  if (existingMatch.status == 'ended') {
    return {
      "errorCode": 6,
      "message": "This room is already over!"
    };
  }

  existingMatch.merge({
    opponent_id: userId,
    status: 'opponent_joined'
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
  const match = await Match.findBy('id', matchId);
  const question = await Question.findBy('id', questionId);

  const isMatchOwner = match.owner_id == userId;

  const playerOldScore = match[isMatchOwner ? "owner_score" : "opponent_score"];
  const rightAnswerScore = question.correct_answer == answer ? 5 : 0;
  const score = playerOldScore + rightAnswerScore + time;

  match.merge({
    [isMatchOwner ? "owner_last_answer" : "opponent_last_answer"]: answer,
    [isMatchOwner ? "owner_score" : "opponent_score"]: score,
  })

  match.save();
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
  room.emit('match-start');

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
  let match = await Match.findBy('id', matchId);

  if (match.round == TOTAL_ROUNDS) {
    endMatch(room, matchId);
    return;
  }

  const question = await QuestionDomain.getRandomQuestion((match.last_questions || "").split(','));
  const round = match.round + 1;

  match.merge({
    status: `round_${round}`,
    round: round,
    owner_last_answer: 0,
    opponent_last_answer: 0,
    last_questions: !match.last_questions ? question.id.toString() : `${match.last_questions},${question.id.toString()}`
  });

  match.save();

  room.emit('match-start-round', { currentRound: match.round, totalRound: TOTAL_ROUNDS });

  await Time.waitMS(TIME_BEFORE_SEND_QUESTION);

  room.emit('match-start-question', question);

  await Time.waitMS(TIME_BEFORE_COUNTDOWN);

  await Time.countdownFrom(ROUND_COUNTDOWN_TIME, async (counted, stopCounting) => {
    room.emit('match-countdown', { seconds: counted });

    match = await Match.findBy('id', matchId);

    if (match.owner_last_answer && opponent_last_answer) {
      stopCounting();
    }
  });

  endRound(room, matchId);
}

/**
 * Ends the round and emits its summary
 * 
 * @param {object} room 
 * @param {integer} matchId 
 */
const endRound = async (room, matchId) => {
  let match = await Match.findBy('id', matchId);

  const lastQuestionId = match.last_questions.split(',').splice(-1);
  const question = await Question.findBy('id', lastQuestionId);

  room.emit('match-round-end', {
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

  playNextRound(room, matchId);
}

/**
 * Ends the match and calculate and persist players statistics
 *
 * @param {object} room
 * @param {integer} matchId
*/
const endMatch = async (room, matchId) => {
  const match = await Match.findBy('id', matchId);

  const owner = await User.findBy('id', match.owner_id);
  const opponent = await User.findBy('id', match.opponent_id);

  const isTied = match.owner_score > 0 && match.owner_score == match.opponent_score;
  const ownerHasWinned = match.owner_score > match.opponent_score;

  const ownerScore = owner.score + match.owner_score;
  const opponentScore = opponent.score + match.opponent_score;

  owner.merge({
    score: ownerScore,
  });

  opponent.merge({
    score: opponentScore,
  });

  if(!isTied) {
    owner.merge({
      wins: owner.wins + (ownerHasWinned ? 1 : 0),
      losses: owner.losses + (!ownerHasWinned ? 1 : 0),
    })

    opponent.merge({
      wins: opponent.wins + (ownerHasWinned ? 0 : 1),
      losses: opponent.losses + (!ownerHasWinned ? 0 : 1),
    })

    match.merge({
      winner_id: ownerHasWinned ? owner.id : opponent.id,
      status: 'finished'
    });
  } else {
    owner.merge({
      ties: owner.ties + 1,
    })

    opponent.merge({
      ties: owner.ties + 1,
    })

    match.merge({
      status: 'tied'
    });
  }

  owner.save();
  opponent.save();
  match.save();

  room.emit('match-end', {
    owner: {
      id: match.owner_id,
      score: ownerScore,
      wins: owner.wins,
      losses: owner.losses,
      ties: owner.ties
    },
    opponent: {
      id: match.opponent_id,
      score: opponentScore,
      wins: opponent.wins,
      losses: opponent.losses,
      ties: opponent.ties
    }
  });

  room.leave();
}