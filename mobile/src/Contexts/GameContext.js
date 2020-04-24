import React, {createContext, useState} from 'react';

export const GameContext = createContext();
const GameProvider = ({children}) => {
  const [hubConnect, setHubConnect] = useState('Initial');
  return (
    <GameContext.Provider value={{hubConnect, setHubConnect}}>
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
