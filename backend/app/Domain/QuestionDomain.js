const Question = use("App/Models/Question")
const Database = use('Database')

/**
 * Get a random question which is not in alreadyPlayedQuestions
 *
 * @param {array} alreadyPlayedQuestions
*/
module.exports.getRandomQuestion = async (alreadyPlayedQuestions) => {
    const [question] = await Database.table('questions').whereNotIn('id', alreadyPlayedQuestions).orderByRaw('RAND()');

    return question;
}

/**
 * Get question by id
 *
 * @param {string} questionId
*/
module.exports.getQuestionById = async (questionId) => {
    const question = await Question.findBy('id', questionId);
    return question;
}