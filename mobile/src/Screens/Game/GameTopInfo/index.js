import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {getUser} from '~/Storage/UserStorage';

import {Container} from './styles';
import ProfileDisplay from '~/Components/ProfileDisplay';

export default function GameTopInfo() {
  const [data, setData] = useState({});

  const getUserData = async () => {
    const user = await getUser();
    setData(user);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <ProfileDisplay data={data} />
      <ProfileDisplay data={data} alternative />
    </Container>
  );
}
