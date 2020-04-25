/**
 * 
 * Generates a six digit unique code
 *
*/
const generateCode = () => {
    const datetime = Date.now();
    return Array.from(datetime.toString()).slice(-6).join('');
}

module.exports = generateCode