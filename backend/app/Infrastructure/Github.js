const Env = use('Env')

const axios = require('axios');

/**
 * Get user public github information
 *
 * @param {string} username
*/
const getUserInformation = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);

        if(Env.get('NODE_ENV') == 'development') {
            console.log(response.data);
        }
    
        return response.data;
    } catch(ex) { 
        return {};
    }
}

module.exports = getUserInformation