const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

var matchId = "123456";

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on('join-match', function (matchInfo) {
        socket.join(matchInfo.match_id);
    });

    socket.on('player-ready', function (playerInfo) {
        console.log(playerInfo.user_id);
        console.log(playerInfo.match_id);
    });

    setTimeout(async () => {
        io.in(matchId).emit('match-start');

        await waitMS(5000);

        io.in(matchId).emit('match-start-round', { round: 1, totalRounds: 10 });

        await waitMS(2000);

        io.in(matchId).emit('match-start-question', { title: "Pergunta01" });

        await waitMS(500);

        await countdownTo(10, (count) => io.in(matchId).emit('match-question-countdown', count));

        await waitMS(500);

        io.in(matchId).emit('match-end-round', { correctAnswer: 2 });

    }, 1000);

});

const countdownTo = (to, onCount, onCountdownEnd) => {
    return new Promise(async (resolve) => {
        var counted = to;
        while (counted > 0) {
            onCount(counted);
            await waitMS(1000);
            counted--;
        }
        resolve();
    });
}

const waitMS = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}