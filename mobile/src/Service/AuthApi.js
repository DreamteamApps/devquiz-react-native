import axios from 'axios';
import {SERVER_URL} from '~/Utils/constants';

export function getData(username) {
  return axios.get(`${SERVER_URL}users/${username}`);
}
