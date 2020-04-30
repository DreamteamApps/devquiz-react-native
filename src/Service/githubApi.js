import axios from 'axios';
const githubRestUrl = 'https://api.github.com/users/';

export function getData(username) {
  return axios.get(`${githubRestUrl}${username}`);
}
