const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

const MatchDomain = use('App/Domain/MatchDomain')
const Time = use("App/Helpers/Time")

io.on('connection', function (socket) {
    socket.on('join-match', async (params) => {
        const { matchId } = params;

        await socket.join(matchId);

        MatchDomain.getMatchPlayers(matchId).then((matchPlayers) => {
            io.in(matchId).emit('player-joined', matchPlayers);
        });
    });

    socket.on('set-ready', async (params) => {
        const { userId, matchId } = params;

        MatchDomain.setReady(userId, matchId).then((matchShouldStart) => {
            io.in(matchId).emit('player-ready', { userId: userId });

            if (matchShouldStart) {
                Time.waitMS(500).then(() => {
                    io.in(matchId).emit('match-start');
                });
            }
        });
    });
});