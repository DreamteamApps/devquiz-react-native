const waitMS = use("App/Helpers/WaitMS");

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
            await waitMS(1000);
            counted--;
        }
        resolve();
    });
};

