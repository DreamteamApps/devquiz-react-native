const env = use('Env')
const Server = use('Server')

const MatchDomain = use('App/Domain/MatchDomain')

const SocketEvents = use('App/Enum/SocketEvents')

const socketConnection = use('socket.io')(Server.getInstance(), {
    pingInterval: 2000,
    pingTimeout: 5000,
});

socketConnection.on('connection', function (connection) {
    const socket = createSocket(connection);

    let room;
    socket.on(SocketEvents.CLIENT_EVENT_JOIN_MATCH, async (params) => {
        const { matchId, userId } = params;

        room = createRoom(matchId, connection);

        MatchDomain.joinMatch(room, matchId, userId);
    });


    socket.on(SocketEvents.CLIENT_EVENT_SET_READY, async (params) => {
        const { userId, matchId } = params;

        MatchDomain.setReady(room, userId, matchId);
    });

    socket.on(SocketEvents.CLIENT_ANSWER_QUESTION, async (params) => {
        const { userId, matchId, questionId, answer, time } = params;

        MatchDomain.answerQuestion(userId, matchId, questionId, answer, time);
    });

    socket.on(SocketEvents.CLIENT_ANSWER_ANSWER_PLAY_AGAIN, async (params) => {
        const { userId, matchId } = params;

        MatchDomain.playAgainAnswer(userId, matchId);
    });

    socket.on('disconnect', () => {
        const { id } = connection;

        MatchDomain.disconnectUserFromMatch(id);
    });
});

const createRoom = (matchId, connection) => {
    connection.join(matchId);

    return {
        socketId: connection.id,
        emit: (eventName, data) => {
            devLog(`Emited ${eventName} to room ${matchId}`, data ? JSON.stringify(data, null, 2) : '');
            socketConnection.to(matchId).emit(eventName, data)
        },
        leave: () => {
            connection.leave();
        }
    }
}

const createSocket = (connection) => {
    devLog(`New client connected ${connection.id}`);
    return {
        on: (eventName, callback) => {
            connection.on(eventName, (data) => {
                devLog(`Received ${eventName}`, data ? JSON.stringify(data, null, 2) : '');
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