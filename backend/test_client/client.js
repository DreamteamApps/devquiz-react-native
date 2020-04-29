var inquirer = require("inquirer");
var ui = new inquirer.ui.BottomBar();

var axios = require("axios");
var socket = require("socket.io-client");

var baseUrl = "http://127.0.0.1:3333";
var socketClient;
var user;
var room;

const promptRetry = async (title, tryAgain, back) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'rawlist',
      message: title,
      choices: [
        'Try again!',
        'Back'
      ]
    },
  ]).then(async (response) => {
    if (response.answer == "Try again!") {
      tryAgain();
    } else {
      back();
    }
  });
}

const startGameOrChangeUrlScreen = () => {
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
        changeUrlScreen();
        break;
      }
      case `Start game (${baseUrl})`: {
        getGithubUsernameScreen();
        break;
      }
    }
  });
};

const getGithubUsernameScreen = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: 'Type github username: ',
    },
  ]).then(async (response) => {
    user = await getUser(response.answer);

    if (!user) {
      getGithubUsernameScreen();
      return;
    }

    startGameScreen();
  });
}

const startGameScreen = () => {
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
        createRoomScreen();
        break;
      }
      case "Join": {
        joinRoomScreen();
        break;
      }
    }
  });
};

const createRoomScreen = async () => {
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
        startGameScreen();
      }
    });
    return;
  }

  socketClient = socket(baseUrl);
  socketClient.emit("join-match", {
    matchId: room.matchId,
    userId: user.id
  });

  matchLobbyScreen(true);
}

const matchLobbyScreen = (created) => {
  socketClient = socket(baseUrl);
  socketClient.emit('join-match', {
    matchId: room.matchId,
    userId: user.id
  });

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
};

const joinRoomScreen = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: 'Type room code: ',
    },
  ]).then(async (response) => {

    if (!response.answer) {
      joinRoomScreen();
      return;
    }

      room = await joinRoom(response.answer);

      if (!room) {
        inquirer
          .prompt([
            {
              type: "list",
              name: "rawlist",
              message: `Join room failed!`,
              choices: [`Try again!`],
            },
          ])
          .then(async (response) => {
            if (response.answer) {
              startGame();
            }
          });
        return;
      }

    if (!room) {

      await promptRetry('Join room failed!', ()=> {
        startGameScreen();
      });

      return;
    }

    matchLobbyScreen();

  });
}

const startMatchMenu = () => {
  ui.updateBottomBar(`Starting match!`);

  socketClient.on('match-start-round', (data) => {
    console.log('start round', data);
  });

  socketClient.on('match-start-question', (data) => {
    console.log('start question', data);
  });

  socketClient.on('match-countdown', (data) => {
    console.log('countdown', data);
  });

  socketClient.on('match-round-end', (data) => {
    console.log('end round', data);
  });

  socketClient.on('match-end', (data) => {
    console.log('match end', data);
  });

  socketClient.on('play-again-countdown', (data) => {
    console.log('play-again-countdown', data);
  });

  socketClient.on('play-again', (data) => {
    console.log('play-again', data);
  });
}

const changeUrlScreen = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: 'Type url: ',
    },
  ]).then((response) => {

    if (!response.answer) {
      changeUrlScreen();
      return;
    }

      baseUrl = response.answer;

    startGameOrChangeUrlScreen();
  });
}

//Http methods
const getUser = async (username) => {
  try {
    const result = await axios.get(`${baseUrl}/users/${username}`);
    return result.data;
  } catch (error) {
    console.log(JSON.stringify(error.response.data, null, 2));
    return null;
  }
};

const createRoom = async () => {
  try {
    const result = await axios.get(`${baseUrl}/match/create/${user.id}`);
    return result.data;
  } catch (error) {
    console.log(JSON.stringify(error.response.data, null, 2));
    return null;
  }
};

const joinRoom = async (matchCode) => {
  try {
    const joinRequest = {
      matchCode: matchCode,
      userId: user.id,
    };
    const result = await axios.post(`${baseUrl}/match/join`, joinRequest);
    return result.data;
  } catch (error) {
    console.log(JSON.stringify(error.response.data, null, 2));
    return null;
  }
}

(() => {
  startGameOrChangeUrlScreen();
})();
