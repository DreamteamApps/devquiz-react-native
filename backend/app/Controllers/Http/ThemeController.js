'use strict'

/**
 * Domains
 * 
*/
const ThemeDomain = use('App/Domain/ThemeDomain')

/**
 * Resourceful controller for interacting with themes
 */
class ThemeController {

  /**
   * Show a list of all themes.
   * GET themes
   *
   */
  async index ({ request }) {
    const page = request.input('page', 1);
    const perPage = request.input('perPage', 10);
    const sortBy = request.input('sortBy', 'id');
    const sort = request.input('sort', 'asc');

    return await ThemeDomain.getAll(page, perPage, sortBy, sort);
  }

  /**
   * Create/save a new theme.
   * POST themes
   *
   * @param {Request} ctx.request
   */
  async store ({ request }) {
    const data = request.only(["name"])

    return await ThemeDomain.create(data);
  }

  /**
   * Display a single theme.
   * GET themes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const { id } = params;
    return await ThemeDomain.getById(id);
  }

  /**
   * Render a form to update an existing theme.
   * GET themes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update theme details.
   * PUT or PATCH themes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a theme with id.
   * DELETE themes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const { id } = params;
    return await ThemeDomain.deleteById(id);
  }

  /**
   * Get themes by a list of ids
   * Get ?ids=1,2,3
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getListById({ request }) {
    const paramIds = request.input('ids', '');
    const ids = paramIds.split(',');

    return await ThemeDomain.getListById(ids);
  }
}

module.exports = ThemeController
