import React, {createContext, useState, useContext, useEffect} from 'react';
import {connect, hubEmit} from '~/Service/SocketIOClient';

export const GameContext = createContext();
const GameProvider = ({children}) => {
  const [hubConnect, setHubConnect] = useState();
  const [showQuestionScreen, setShowQuestionScreen] = useState(false);
  const [showRoundScreen, setShowRoundScreen] = useState(true);
  const [players, setPlayers] = useState({
    player: {
      name: 'Ricardo Vaz Correia Dutra',
      score: 10,
      avatar:
        'https://img.quizur.com/f/img5dcff6e29551f7.10735221.png?lastEdited=1573910302',
    },
    opponent: {
      name: 'Daniel Porto Carvalho',
      score: 30,
      avatar:
        'https://img.quizur.com/f/img5dcff6e29551f7.10735221.png?lastEdited=1573910302',
    },
  });
  const [roundTime, setRoundTime] = useState('');
  const [result, setResult] = useState({
    opponent: {id: 8, losses: 7, score: 0, ties: 0, wins: 5},
    owner: {id: 1, losses: 21, score: 0, ties: 8, wins: 33},
  });

  const isPlayer = (ownerId) => {
    return players.player.id === ownerId;
  };

  const [quiz, setQuiz] = useState({
    answers: [],
    showCorrectAnwser: false,
    questionImage: null,
    disableAllButtons: false,
  });

  const [game, setGame] = useState({
    currentRound: 1,
    totalRound: 5,
    showRoundScreen: false,
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
        isPlayer,
        setGame,
        quiz,
        setQuiz,
        emit,
        players,
        setPlayers,
        roundTime,
        setRoundTime,
        result,
        setResult,
        setShowQuestionScreen,
        showQuestionScreen,
        setShowRoundScreen,
        showRoundScreen,
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
