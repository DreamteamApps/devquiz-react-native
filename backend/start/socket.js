/**
 * Server
 * 
*/
const env = use('Env')
const Server = use('Server')
const socketConnection = use('socket.io')(Server.getInstance(), { pingInterval: 2000, pingTimeout: 5000 });

/**
 * Domains
 * 
*/
const MatchDomain = use('App/Domain/MatchDomain')

/**
 * General
 * 
*/
const SocketEvents = use('App/Enum/SocketEvents')

socketConnection.on('connection', function (connection) {
    const socket = createSocket(connection);

    socket.on(SocketEvents.CLIENT_EVENT_JOIN_MATCH, async (params) => {
        const { matchId, userId } = params;
        
        connection.join(matchId);

        let room = createRoom(matchId, connection);

        MatchDomain.joinMatch(room, matchId, userId);
    });


    socket.on(SocketEvents.CLIENT_EVENT_SET_READY, async (params) => {
        const { userId, matchId } = params;

        let room = createRoom(matchId, connection);

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

    socket.on('disconnect', async () => {
        const { id } = connection;

        MatchDomain.disconnectUserFromMatch(id);
    });
});

const createRoom = (matchId, connection) => {
    return {
        socketId: connection.id,
        emit: (eventName, data) => {
            devLog(`Emited ${eventName} to room ${matchId}`, data ? JSON.stringify(data, null, 2) : '');
            socketConnection.to(matchId).emit(eventName, data)
        },
        leave: () => {
            connection.leave(matchId);
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