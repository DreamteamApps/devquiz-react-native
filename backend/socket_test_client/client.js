var inquirer = require('inquirer')
var ui = new inquirer.ui.BottomBar()

var axios = require('axios')
var socket = require("socket.io-client")

var baseUrl = "http://127.0.0.1:3333";
var socketClient;
var user;
var room;

const startGameOrChangeUrl = () => {
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'answer',
      message: 'Start client or change url?',
      choices: [
        `Start game (${baseUrl})`,
        'Change url',
      ]
    },
  ]).then((response) => {
    switch (response.answer) {
      case "Change url": {
        changeUrl();
        break;
      }
      case `Start game (${baseUrl})`: {
        getGithubUsername();
        break;
      }
    }
  });
}

const getGithubUsername = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: 'Type github username: ',
    },
  ]).then(async (response) => {
    user = await getUser(response.answer);

    if (!user) {
      getGithubUsername();
      return;
    }

    startGame();
  });
}

const startGame = () => {
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'answer',
      message: `(${user.name} - @${user.login} - ${user.repos} repos  \r\nCreate or Join a room?`,
      choices: [
        `Create room`,
        'Join',
      ]
    },
  ]).then((response) => {
    switch (response.answer) {
      case "Create room": {
        createRoomMenu();
        break;
      }
      case "Join": {
        joinRoomMenu();
        break;
      }
    }
  });
}

const createRoomMenu = async () => {
  room = await createRoom();

  if (!room) {
    inquirer.prompt([
      {
        type: 'list',
        name: 'rawlist',
        message: `Create room failed!`,
        choices: [
          `Try again!`
        ]
      },
    ]).then(async (response) => {
      if (response.answer) {
        startGame();
      }
    });
    return;
  }

  socketClient = socket(baseUrl);
  socketClient.emit('join-match', {
    matchId: room.matchId
  });

  matchLobbyMenu(true);
}

const matchLobbyMenu = (created) => {
  socketClient.on('player-joined', (players) => {
    if (players.opponent && players.opponent.id != user.id) {
      ui.updateBottomBar(`Opponent ${players.opponent.name} joined room!`);
    }
  });

  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'answer',
      message: created ? `Created room ${room.matchCode}` : 'Joined room!',
      choices: [
        `I'm Ready`,
        'Leave room'
      ]
    },
  ]).then(async (response) => {

    switch (response.answer) {
      case "I'm Ready": {
        socketClient.on('player-ready', (params) => {
          ui.updateBottomBar(`Ready!`);
        });

        socketClient.on('match-start', () => {
          startMatchMenu();
        });

        socketClient.emit('set-ready', {
          userId: user.id,
          matchId: room.matchId
        });

        break;
      }
      case `Leave room`: {
        return;
      }
    }
  });
}

const joinRoomMenu = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: 'Type room code: ',
    },
  ]).then(async (response) => {

    if (!response.answer) {
      changeUrl();
      return;
    }

    room = await joinRoom(response.answer);

    if (!room) {
      inquirer.prompt([
        {
          type: 'list',
          name: 'rawlist',
          message: `Join room failed!`,
          choices: [
            `Try again!`
          ]
        },
      ]).then(async (response) => {
        if (response.answer) {
          startGame()
        }
      });
      return;
    }

    socketClient = socket(baseUrl);
    socketClient.emit('join-match', {
      matchId: room.matchId
    });

    matchLobbyMenu();

  });
}

const startMatchMenu = () => {
  ui.updateBottomBar(`Starting match!`);
}

const changeUrl = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: 'Type url: ',
    },
  ]).then((response) => {

    if (!response.answer) {
      changeUrl();
      return;
    }

    baseUrl = response.answer;

    startGameOrChangeUrl();
  });
}

const getUser = async (username) => {
  try {
    const result = await axios.get(`${baseUrl}/users/${username}`);
    return result.data;
  }
  catch (error) {
    console.log(JSON.stringify(error.response.data, null, 2));
    return null;
  }
}

const createRoom = async () => {
  try {
    const result = await axios.get(`${baseUrl}/match/create/${user.id}`);
    return result.data;
  }
  catch (error) {
    console.log(JSON.stringify(error.response.data, null, 2));
    return null;
  }
}

const joinRoom = async (matchCode) => {
  try {
    const joinRequest = {
      matchCode: matchCode,
      userId: user.id
    };
    const result = await axios.post(`${baseUrl}/match/join`, joinRequest);
    return result.data;
  }
  catch (error) {
    console.log(JSON.stringify(error.response.data, null, 2));
    return null;
  }
}
(() => {
  startGameOrChangeUrl();
})();


// var socket = require("socket.io-client")("http://127.0.0.1:3333");

// var matchId = "123456";
// var userId = 123;

// socket.on("connect", function () {
//   console.log("connect");

//   socket.emit("join-match", {
//     match_id: matchId,
//     user_id: userId,
//   });
// });

// socket.on("match-start", function (data) {
//   console.log("match-start");
// });

// socket.on("match-start-round", function (data) {
//   console.log(data);
// });

// socket.on("match-start-question", function (data) {
//   console.log(data);
// });

// socket.on("match-question-countdown", function (data) {
//   console.log(data);
// });

// socket.on("match-end-round", function (data) {
//   console.log(data);
// });
