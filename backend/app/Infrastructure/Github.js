const axios = require('axios');

/**
 * Get user public github information
 *
 * @param {string} username
*/
module.exports.getUserInformation = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch(ex) { 
        return {};
    }
}