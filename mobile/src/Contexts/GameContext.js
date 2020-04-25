import React, {createContext, useState, useContext, useEffect} from 'react';

export const GameContext = createContext();
const GameProvider = ({children}) => {
  const [hubConnect, setHubConnect] = useState('Initial');
  const [game, setGame] = useState({
    currentRound: 1,
    totalRounds: 5,
    shouldShowRoundContainer: false,
    ownerScore: 10,
    opponentScore: 100,
    opponent: {
      avatar:
        'https://avatars3.githubusercontent.com/u/39194683?s=460&u=2eae246d434894f5674ca1afc033ba93ed20b86f&v=4',
      name: 'Daniel Porto',
      score: '73',
      repos: 10,
      login: 'dankobaia',
    },
    owner: {
      avatar:
        'https://avatars1.githubusercontent.com/u/6720362?s=460&u=ffe4109e0c18c230c8f90fb25ba1bdddfec3a61c&v=4',
      name: 'erick Alves',
      score: '50',
    },
  });

  useEffect(() => {
    console.log(game);
  }, [game]);

  return (
    <GameContext.Provider value={{hubConnect, setHubConnect, game, setGame}}>
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
export function useGame() {
  const context = useContext(GameContext);
  return context;
}
