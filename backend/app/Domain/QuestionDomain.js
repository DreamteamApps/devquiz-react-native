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