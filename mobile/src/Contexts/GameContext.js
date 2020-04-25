import React, {createContext, useState} from 'react';

export const GameContext = createContext();
const GameProvider = ({children}) => {
  const [hubConnect, setHubConnect] = useState('Initial');
  const [game, setGame] = useState({
    round: 2,
    totalRounds: 10,
    ownerScore: 10,
    opponentScore: 100,
  });

  return (
    <GameContext.Provider value={{hubConnect, setHubConnect, game}}>
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
