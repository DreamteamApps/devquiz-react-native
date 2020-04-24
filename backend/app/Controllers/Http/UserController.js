'use strict'

const User = use("App/Models/User")
const getUserInformation = require("../../Infrastructure/Github")

class UserController {
  async getOrCreateUser({params, response}) {
    const {login, name, public_repos, avatar_url} = await getUserInformation(params.username);

    if(!login) {
      return response.status(404).send();
    }

    let existingUser = await User.findBy('username', login);
    
    if(!existingUser) {
      await User.create({
        username: login,
        name : name || login,
        repos_quantity : public_repos,
        image_url : avatar_url
      });
      existingUser = await User.findBy('username', login);
    } else {
      existingUser.merge({
        repos_quantity : public_repos,
        image_url : avatar_url
      })
      await existingUser.save();
    }

    return existingUser;
  }
}

module.exports = UserController
