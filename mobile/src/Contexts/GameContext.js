import React, {createContext, useState, useContext, useEffect} from 'react';
import {connect, hubEmit} from '~/Service/SocketIOClient';

export const GameContext = createContext();
const GameProvider = ({children}) => {
  const [hubConnect, setHubConnect] = useState();
  const [players, setPlayers] = useState({});
  const [roundTime, setRoundTime] = useState(10);
  const [quiz, setQuiz] = useState({
    answers: [],
    showCorrectAnwser: false,
  });

  const [game, setGame] = useState({
    currentRound: 1,
    totalRound: 5,
    showRoundScreen: false,
    showQuestionScreen: false,
    matchId: 10,
    roomCode: '',
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

  useEffect(() => {
    console.log('Initializing GameContext', game);
  }, []);
  return (
    <GameContext.Provider
      value={{
        hubConnect,
        setHubConnect,
        game,
        setGame,
        quiz,
        setQuiz,
        emit,
        players,
        setPlayers,
        roundTime,
        setRoundTime,
      }}>
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
export function useGame() {
  const context = useContext(GameContext);
  return context;
}
