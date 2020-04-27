import React, {createContext, useState, useContext, useEffect} from 'react';
import {connect, hubEmit} from '~/Service/SocketIOClient';

export const GameContext = createContext();
const GameProvider = ({children}) => {
  const [hubConnect, setHubConnect] = useState();

  const [game, setGame] = useState({
    currentRound: 1,
    totalRounds: 5,
    roomCode: '',
    quiz: {
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      questionImage:
        'https://petgusto.com/wp-content/uploads/2014/10/mini-porco-tudo-sobre-o-animal-que-virou-mania-no-brasil-3.jpg',
      awnsers: [
        {
          index: 1,
          text: 'A1',
          playerSelected: false,
          opponentSelected: false,
          correct: false,
        },
        {
          index: 2,
          text: 'Awnser 2',
          playerSelected: false,
          opponentSelected: false,
          correct: false,
        },
        {
          index: 3,
          text: 'Awnser asdasdasdas weasd r',
          playerSelected: false,
          opponentSelected: false,
          correct: false,
        },
        {
          index: 4,
          text: 'resp.Certa',
          playerSelected: false,
          opponentSelected: false,
          correct: false,
        },
      ],
      showCorrectAwnser:false
    },
    opponent: {
      avatar:"https://media.fstatic.com/QU_NLlfrFI3qONS_5XKnEU5xDJU=/full-fit-in/629x300/media/articles/main/2019/12/20/fox-407168579.jpg"
    },
    player: {
      avatar:"https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2017/03/Avatar-1280x720.jpg"
    },
  });

  const emit = (path, body) => {
    hubEmit(hubConnect, path, body);
  };
  useEffect(() => {
    async function connectHub() {
      let hubConnect = await connect();
      console.log('conectar no socket');
      setHubConnect(hubConnect);
    }
    connectHub();
  }, []);

  useEffect(() => {
    console.log('GameUpdated', game);
  }, [game]);

  return (
    <GameContext.Provider
      value={{hubConnect, setHubConnect, game, setGame, emit}}>
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
export function useGame() {
  const context = useContext(GameContext);
  return context;
}
