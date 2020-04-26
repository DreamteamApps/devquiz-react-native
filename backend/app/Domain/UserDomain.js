const User = use("App/Models/User")

const GitHub = use("App/Infrastructure/Github")

/**
 * Gets a user in github, create it or update in our database and return it
 *
 * @param {string} githubUser
*/
module.exports.getOrCreateUser = (githubUser) => {
    return GitHub.getUserInformation(githubUser).then(async (userData) => {
        const { login, name, public_repos, avatar_url } = userData;

        if (!login) {
            return {
                "errorCode": 1,
                "message": "This user doesn't exists!"
            }
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
        }
    });
}