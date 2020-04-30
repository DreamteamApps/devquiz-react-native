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
 * Create a new
 *
 * @param {object} question
*/
module.exports.create = async (question) => {
    const created = await Question.create(question)
    return created;
}

/**
 * Get questions by id list
 *
 * @param {Array<string>} page
*/
module.exports.getListById = async (ids) => {
    const retrieved = await Database.from('questions').whereIn('id', ids);
    return retrieved;
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
 * @param {string} id
*/
module.exports.getById = async (id) => {
    const retrieved = await Question.findBy('id', id);
    return retrieved;
}

/**
 * Delete by id
 *
 * @param {string} id
*/
module.exports.deleteById = async (id) => {
    const retrieved = await Question.findBy('id', id);
    await retrieved.delete();
}