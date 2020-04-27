const env = use('Env')
const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

const MatchDomain = use('App/Domain/MatchDomain')

io.on('connection', function (socket) {
    devLog(`New client connected ${socket.id}`);

    let room;

    socket.on('join-match', async (params) => {
        const { matchId } = params;

        await socket.join(matchId);
        room = io.in(matchId);
        
        devLog(`Client ${socket.id} joined match ${matchId}`);
        
        MatchDomain.getMatchPlayers(room, matchId);
    });

    socket.on('set-ready', async (params) => {
        const { userId, matchId } = params;

        devLog(`Set player ${userId} in match ${matchId} as ready!`);

        MatchDomain.setReady(room, userId, matchId);
    });

    socket.on('answer-question', async (params) => {
        const { userId, matchId, questionId, answer, time } = params;

        devLog(`Player ${userId} answer ${answer} to the question ${questionId} in ${time} seconds in the match ${matchId}!`);

        MatchDomain.answerQuestion(userId, matchId, questionId, answer, time);
    });
});

const devLog = (...args) => {
    if (process.env.NODE_ENV == "development") {
        console.log(...args);
    }
}