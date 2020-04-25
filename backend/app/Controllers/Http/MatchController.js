'use strict'

const User = use("App/Models/User")
const Match = use("App/Models/Match")
const CodeGenerator = use("App/Helpers/CodeGenerator")

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

      const code = CodeGenerator.generateCode();

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

  /**
   * Joins a user in a match using matchCode
   * POST matches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async joinMatchWithCode({ request, response }) {
    try {
      const {matchCode, userId} = request.only(['matchCode', 'userId']);

      let existingUser = await User.findBy('id', userId);
      if(!existingUser) {
        return response.status(400).send({
          "code": 1,
          "message": "This user doesn't exists!"
        });
      }

      let existingMatch = await Match.findBy('code', matchCode);
      if(!existingMatch) {
        return response.status(400).send({
          "code": 3,
          "message": "This room doesn't exists!"
        });
      } 

      if(existingMatch.owner_id == userId) {
        return response.status(400).send({
          "code": 7,
          "message": "You cannot join your own room!"
        });
      }

      if(existingMatch.opponent_id) {
        return response.status(400).send({
          "code": 4,
          "message": "This room is full!"
        });
      }

      if(['pristine', 'ended'].indexOf(existingMatch.status) == -1) {
        return response.status(400).send({
          "code": 5,
          "message": "This room is already started!"
        });
      }

      if(existingMatch.status == 'ended') {
        return response.status(400).send({
          "code": 6,
          "message": "This room is already over!"
        });
      }

      existingMatch.merge({
        opponent_id : userId,
        status: 'opponent_joined'
      });

      await existingMatch.save();
      
      return {
        matchId: existingMatch.id
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
