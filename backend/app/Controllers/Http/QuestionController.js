'use strict'

/**
 * Domains
 * 
*/
const QuestionDomain = use('App/Domain/QuestionDomain')

class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const page = request.input('page', 1);
    const perPage = request.input('perPage', 10);
    const sortBy = request.input('sortBy', 'id');
    const sort = request.input('sort', 'asc');

    return await QuestionDomain.getAll(page, perPage, sortBy, sort);
  }

  /**
   * Create/save a new question.
   * POST questions
   *
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const data = request.only(["title", "image", "answer1", "answer2", "answer3", "answer4", "correct_answer", "theme_id"])

    return await QuestionDomain.create(data);
  }

  /**
   * Display a single question.
   * GET questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const { id } = params;
    return await QuestionDomain.getById(id);
  }

  /**
   * Render a form to update an existing question.
   * GET questions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    return await QuestionDomain.deleteById(id);
  }

  /**
   * Get questions by a list of ids
   * Get ?ids=1,2,3
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getListById({ params, request, response }) {
    const paramIds = request.input('ids', '');
    const ids = paramIds.split(',');

    return await QuestionDomain.getListById(ids);
  }
}

module.exports = QuestionController
