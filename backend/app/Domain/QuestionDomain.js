/**
 * Models
 * 
*/
const Database = use('Database')
const Question = use("App/Models/Question")


/**
 * Get all questions paginated and sorted
 *
 * @param {string} page
 * @param {string} perPage
 * @param {string} sortBy
 * @param {string} sort
*/
module.exports.getAll = async (page, perPage, sortBy, sort) => {
    const retrieved = await Question.query().orderBy(sortBy, sort).paginate(page, perPage);
    return retrieved;
}

/**
 * Get all questions paginated and sorted
 *
 * @param {object} question
*/
module.exports.create = async (question) => {
    const created = await Question.create(question)
    return created;
}

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