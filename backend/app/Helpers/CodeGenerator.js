/**
 * 
 * Generates a six digit unique code
 *
*/
module.exports.generateCode = () => {
    const datetime = Date.now();
    return Array.from(datetime.toString()).slice(-6).join('');
}


