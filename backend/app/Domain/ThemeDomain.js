/**
 * Models
 * 
*/
const Database = use('Database')
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
 * Get themes by id list
 *
 * @param {Array<string>} page
*/
module.exports.getListById = async (ids) => {
    const retrieved = await Database.from('themes').whereIn('id', ids);
    return retrieved;
}

/**
 * Create a new
 *
 * @param {object} theme
*/
module.exports.create = async (theme) => {
    const created = await Theme.create(theme)
    return created;
}

/**
 * Get by id
 *
 * @param {string} id
*/
module.exports.getById = async (id) => {
    const retrieved = await Theme.findBy('id', id);
    return retrieved;
}

/**
 * Delete by id
 *
 * @param {string} id
*/
module.exports.deleteById = async (id) => {
    const retrieved = await Theme.findBy('id', id);
    await retrieved.delete();
}