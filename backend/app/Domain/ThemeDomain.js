/**
 * Models
 * 
*/
const Theme = use("App/Models/Theme")

/**
 * Get all paginated and sorted
 *
 * @param {string} page
 * @param {string} perPage
 * @param {string} sortBy
 * @param {string} sort
*/
module.exports.getAll = async (page, perPage, sortBy, sort) => {
    const retrieved = await Theme.query().orderBy(sortBy, sort).paginate(page, perPage);
    return retrieved;
}

/**
 * Create new
 *
 * @param {object} question
*/
module.exports.create = async (question) => {
    const created = await Theme.create(question)
    return created;
}