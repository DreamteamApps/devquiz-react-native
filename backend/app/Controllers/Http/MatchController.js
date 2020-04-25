'use strict'

const User = use("App/Models/User")
const Match = use("App/Models/Match")
const generateCode = require("../../Helpers/CodeGenerator")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class MatchController {

  /**
   * Create a new match for the user.
   * POST matches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, response }) {
    try {
      const userId = params.userid;

      let existingUser = await User.findBy('id', userId);
      if(!existingUser) {
        return response.status(400).send({
          "code": 1,
          "message": "This user doesn't exists!"
        });
      }

      const code = generateCode();

      const createdMatch = await Match.create({
        code: code,
        owner_id: userId,
        status: "pristine"
      });
      
      return {
        matchId: createdMatch.id,
        matchCode: createdMatch.code 
      };
    } catch (error) {
      return response.status(400).send({
        "code": 2,
        "message": "An error has occured!",
        "error": error
      });
    }
  }
}

module.exports = MatchController
