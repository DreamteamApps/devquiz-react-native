import axios from 'axios';
import {SERVER_URL} from '~/config';

export function getData(username, playerId = '') {
  return axios.post(`${SERVER_URL}user/create`, {
    githubuser: username,
    pushToken: playerId,
  });
}
export function getRecentlyUsers() {
  return axios.get(`${SERVER_URL}user/recent/`);
}
