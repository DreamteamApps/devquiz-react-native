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
    opponent: {},
    player: {},
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
