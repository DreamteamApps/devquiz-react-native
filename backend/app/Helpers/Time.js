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
module.exports.countdownFrom = (from, onCount) => {
    return new Promise(async (resolve) => {
        var counted = from;
        var keepCounting = true;

        while (counted >= 0 && keepCounting) {
            onCount(counted, () => keepCounting = false);

            if(keepCounting) {
                await module.exports.waitMS(1000);
                counted--;
            }
        }

        resolve();
    });
}


