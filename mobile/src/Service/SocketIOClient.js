import React from 'react';
import {View} from 'react-native';
import io from 'socket.io-client';
import {SERVER_URL} from '~/Utils/constants';

export const connect = () => {
  try {
    const con = io(SERVER_URL);
    return con;
  } catch (error) {
    console.log('SOCKETCON', error);
  }
};

export const hubEmit = (con, path, body) => {
  try {
    con.emit(path, body);
  } catch (error) {
    console.log('socketError', error);
  }
};
// io.on('connect', function () {
//   console.log('connect');

//   io.emit('join-match', {
//     match_id: matchId,
//     user_id: userId,
//   });
// });
