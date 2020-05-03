import axios from 'axios';
import {SERVER_URL} from '~/Utils/constants';

export function createRoom(userId, opponentId = '') {
  return axios.post(`${SERVER_URL}match/create/`, {
    opponentId: opponentId,
    userId: userId,
  });
}
export function joinMatch(userId, roomCode) {
  return axios.post(`${SERVER_URL}match/join/`, {
    matchCode: roomCode,
    userId: userId,
  });
}
