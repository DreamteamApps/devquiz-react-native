'use strict'

const UserDomain = use('App/Domain/UserDomain')

class UserController {
  /**
   * 
   * Gets a user in github, create it or update in our database and return it
   *
  */
  async getOrCreateUser({ params, response }) {
    const {githubuser} = params;

    const result = await UserDomain.getOrCreateUser(githubuser);

    if (!result.errorCode) {
      return result;
    }

    return response.status(400).send(result);
  }
}

module.exports = UserController
