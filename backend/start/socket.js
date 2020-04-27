const env = use('Env')
const Server = use('Server')
const socketConnection = use('socket.io')(Server.getInstance())

const MatchDomain = use('App/Domain/MatchDomain')

socketConnection.on('connection', function (connection) {
    const socket = createSocket(connection);

    let room;

    socket.on('join-match', async (params) => {
        const { matchId } = params;

        room = createRoom(matchId, connection);

        MatchDomain.getMatchPlayers(room, matchId);
    });

    socket.on('set-ready', async (params) => {
        const { userId, matchId } = params;

        MatchDomain.setReady(room, userId, matchId);
    });

    socket.on('answer-question', async (params) => {
        const { userId, matchId, questionId, answer, time } = params;

        MatchDomain.answerQuestion(userId, matchId, questionId, answer, time);
    });
});

const createRoom = (matchId, connection) => {
    connection.join(matchId);
    
    return {
        emit: (eventName, data) => {
            devLog(`Emited ${eventName} to room ${matchId}`, JSON.stringify(data, null, 2));
            socketConnection.to(matchId).emit(eventName, data)
        },
        leave: () => {
            connection.leave();
        }
    }
}

const createSocket = (socket) => {
    devLog(`New client connected ${socket.id}`);
    return {
        on: (eventName, callback) => {
            socket.on(eventName, (data)=> {
                devLog(`Received ${eventName}`, JSON.stringify(data, null, 2));
                callback(data);
            });
        }
    }
}

const devLog = (...args) => {
    if (process.env.NODE_ENV == "development") {
        console.log(...args);
    }
}