'use strict'

const User = use("App/Models/User")
const getUserInformation = require("../../Infrastructure/Github")

class UserController {
  /**
   * 
   * Gets a user in github, create it or update in our database and return it
   *
  */
  async getOrCreateUser({ params, response }) {
    try {
      const { login, name, public_repos, avatar_url } = await getUserInformation(params.githubuser);

      if (!login) {
        return response.status(400).send({
          "code": 1,
          "message": "This user doesn't exists!"
        });
      }

      let existingUser = await User.findBy('username', login);
      if (!existingUser) {
        await User.create({
          username: login,
          name: name || login,
          repos_quantity: public_repos,
          image_url: avatar_url
        });
        existingUser = await User.findBy('username', login);
      } else {
        existingUser.merge({
          repos_quantity: public_repos,
          image_url: avatar_url
        })
        await existingUser.save();
      }

      return {
        id: existingUser.id,
        login: existingUser.username,
        name: existingUser.name,
        avatar: existingUser.image_url,
        repos: existingUser.repos_quantity
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

module.exports = UserController
