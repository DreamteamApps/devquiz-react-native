const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

const User = use("App/Models/User")
const Match = use("App/Models/Match")
const MatchDomain = use('App/Domain/MatchDomain')
const waitMS = use("App/Helpers/WaitMS")

io.on('connection', function (socket) {
    socket.on('join-match', async (params) => {
        const { matchId } = params;

        await socket.join(matchId);

        return Match.findBy('id', matchId).then((existingMatch) => {
            const getRolesPromises = [];
            var matchPlayers = {};

            const getOwnerPromise = User.findBy('id', existingMatch.owner_id).then((owner) => matchPlayers.owner = {
                id: owner.id,
                login: owner.username,
                name: owner.name,
                avatar: owner.image_url,
                repos: owner.repos_quantity
            });

            getRolesPromises.push(getOwnerPromise);

            if (existingMatch.opponent_id) {
                const getOpponentPromise = User.findBy('id', existingMatch.opponent_id).then((opponent) => matchPlayers.opponent = {
                    id: opponent.id,
                    login: opponent.username,
                    name: opponent.name,
                    avatar: opponent.image_url,
                    repos: opponent.repos_quantity
                });

                getRolesPromises.push(getOpponentPromise);
            }

            Promise.all(getRolesPromises).then(() => {
                io.in(matchId).emit('player-joined', matchPlayers);
            });
        });
    });

    socket.on('set-ready', async (params) => {
        const { userId, matchId } = params;
        MatchDomain.setReady(userId, matchId).then((matchShouldStart) => {
            io.in(matchId).emit('player-ready', { userId: userId });
            if (matchShouldStart) {
                waitMS(500).then(() => {
                    io.in(matchId).emit('match-start');
                });
            }
        });
    });
});