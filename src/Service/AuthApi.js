import axios from 'axios';
import {SERVER_URL} from '~/Utils/constants';

export function getData(username, playerId = '') {
  return axios.post(`${SERVER_URL}user/create`, {
    githubuser: username,
    pushToken: playerId,
  });
}
export function getRecentlyUsers(userId) {
  return axios.get(`${SERVER_URL}user/recent/${userId}`);
}
