/**
 * 
 * Returns a promise that takes at least X ms to resolve
 *
*/
module.exports.waitMS = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

