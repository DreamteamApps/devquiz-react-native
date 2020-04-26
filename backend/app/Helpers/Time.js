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



/**
 * 
 * Count Down from X to 0, second by second, and every time it count it calls onCount
 *
*/
module.exports.countdownTo = (from, onCount) => {
    return new Promise(async (resolve) => {
        var counted = from;
        while (counted > 0) {
            onCount(counted);
            await this.waitMS(1000);
            counted--;
        }
        resolve();
    });
};

