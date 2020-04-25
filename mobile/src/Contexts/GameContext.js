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
