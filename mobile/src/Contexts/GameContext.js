import React, {createContext, useState, useContext, useEffect} from 'react';
import {connect, hubEmit} from '~/Service/SocketIOClient';
import io from 'socket.io-client';

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
        {text: 'A1', selected: true, oponentSelectd: false},
        {text: 'Awnser 2', selected: false, oponentSelectd: false},
        {
          text: 'Terceira resposta da pergunta',
          selected: false,
          oponentSelectd: false,
        },
        {text: 'resp.Certa', selected: false, oponentSelectd: false},
      ],
    },
    opponent: {
      avatar:
        'https://avatars3.githubusercontent.com/u/39194683?s=460&u=2eae246d434894f5674ca1afc033ba93ed20b86f&v=4',
      name: 'Daniel Porto',
      score: 73,
      repos: 10,
      login: 'dankobaia',
    },
    owner: {
      avatar:
        'https://avatars1.githubusercontent.com/u/6720362?s=460&u=ffe4109e0c18c230c8f90fb25ba1bdddfec3a61c&v=4',
      name: 'Erick Alves',
      score: 50,
      repos: 10,
      login: 'erickcouto',
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
